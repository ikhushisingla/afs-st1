'use client';
import useUserState from '@/hooks/use-user';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
export default function Home() {
  const router=useRouter();
  const user=useUserState(state=>state.user);
  console.log("HOME",user)
  if(!user){
    router.replace('/login');
  }
  if(!user.isVerified){
    router.replace('/verify')
  }
  return (
    <h1 className='text-9xl text-center p-10'>
     Hey, {user.name}
      </h1>
  );
}
