import { fetchRedis } from '@/helpers/redis';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { pusherClient, pusherServer } from '@/lib/puhser';
import { toPusherKey } from '@/lib/utils';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id: idToAdd } = z.object({ id: z.string() }).parse(body);

    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    //check if user is already friend
    const isAlreadyFriends = (await fetchRedis(
      'sismember',
      `user:${session.user.id}:friends`,
      idToAdd
    )) as 0 | 1;

    if (isAlreadyFriends) {
      return new Response('Already friends with this user', { status: 400 });
    }
    //check if user has a friend request form idToAdd
    const hasFriendRequest = (await fetchRedis(
      'sismember',
      `user:${session.user.id}:incoming_friend_requests`,
      idToAdd
    )) as 0 | 1;

    console.log('has friend request', hasFriendRequest);
    
      if (hasFriendRequest) {
        return new Response('Already friends with this user', { status: 400 });
      }
      pusherServer.trigger(toPusherKey(`user:${idToAdd}:friends`),'new_friend',{})
    await db.sadd(`user:${session.user.id}:friends`, idToAdd);
    await db.sadd(`user:${idToAdd}:friends`, session.user.id);
    await db.srem(`user:${session.user.id}:incoming_friend_requests`, idToAdd);
    return new Response('ok');
  } catch (err) {
    console.error('err', err);
    if (err instanceof z.ZodError)
      return new Response(`Invalid request payload`);
  }
}
