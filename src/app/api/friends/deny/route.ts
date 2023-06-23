import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db";
import { getServerSession } from "next-auth"
import { z } from "zod";

export async function POST(req:Request) {
    try {
        const body = await req.json();
        const { id: idToDeny } = z.object({ id: z.string() }).parse(body);
    
        const session = await getServerSession(authOptions);
    
        if (!session) {
          return new Response('Unauthorized', { status: 401 });
        }
    
        //check if user is already friend
        const isAlreadyFriends = (await fetchRedis(
          'sismember',
          `user:${session.user.id}:friends`,
          idToDeny
        )) as 0 | 1;
    
        if (isAlreadyFriends) {
        //   return new Response('Already friends with this user', { status: 400 });
        db.srem(`user:${session.user.id}:incoming_friend_requests`,idToDeny)
        }
     
    
      return new Response('OK')
      } catch (err) {
        console.error('err', err);
        if (err instanceof z.ZodError)
          return new Response(`Invalid request payload`);
      }
}