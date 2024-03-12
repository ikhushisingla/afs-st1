'use client';
import useUserState from '@/hooks/use-user';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
export default function Home() {
  const [user,setUser]=useState(null)
  const router=useRouter();
  useEffect(()=>{
    const user=useUserState(state=>state.user);
  if(!user){
    router.replace('/login');
  }
  setUser(user)
  if(!user.isVerified){
    router.replace('/verify')
  }
  },[])
  return (
    <h1 className='text-9xl text-center p-10'>
     Hey, {user? user.name: 'User'}
      </h1>
  );
}
