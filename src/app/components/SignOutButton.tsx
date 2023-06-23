'use client';
import { ButtonHTMLAttributes, FC, useState } from 'react';
import Button from './ui/Button';
import { toast } from 'react-hot-toast';
import { signOut } from 'next-auth/react';
import { Loader2, LogOut } from 'lucide-react';

interface SignOutButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const SignOutButton: FC<SignOutButtonProps> = (props) => {
  const [isSignOut, setIsSignOut] = useState(false);
  return (
    <Button
    variant='ghost'
      {...props}
      onClick={async () => {
        setIsSignOut(true);
        try {
          await signOut();
        } catch (error) {
          toast.error('There was a problem sigining out');
        } finally {
          setIsSignOut(false);
        }
      }}
    >{
        isSignOut?(<Loader2 className='animate-spin h-4 w-4'/>):(<LogOut className='w-4 h-4'/>)
    }</Button>
  );
};

export default SignOutButton;
