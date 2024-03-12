'use client';
import OTP from '@/components/otp';
import useUserState from '@/hooks/use-user'
import React ,{useState,useEffect}from 'react'
import toast  from 'react-hot-toast';
import {useRouter} from 'next/navigation'
import axios from 'axios'

const Page = () => {
  const {user,setUser}=useUserState(state=>state);
  const [otp,setOTP]=useState('');
  useEffect(()=>{
    const router=useRouter()
    console.log(user)
    if(!user){
      router.push('/login');
      return null;
    }
  },[])
   const handleSubmit=async()=>{
    const email=user.email
    const res=await axios.post('/api/verify',{email,otp});
      console.log(res)
      if(res.data.data){
        toast.success('verification successful');
        setUser(res.data.data.user);
        router.replace('/')
      }
      else{
        toast.error(res.data.error.message)
      }
    }
    const resendOtp=async()=>{
      const email=user.email
      const res=await axios.post('/api/resend-otp',{email});
      console.log(res);
      if(res.data.data){
        toast.success('otp sent successfully');
      }
      else{
        toast.error(res.data.error.message)
      }
    }
   
  return (
    <div className=' h-screen max-w-screen-2xl flex flex-col items-center text-white p-10'>
          <div class="absolute inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_10%,#656ED3)]"></div>
 <h1 className='text-4xl text-center p-10'>
    Hey, {user?.name || 'User'}
     </h1>
     <div className='w-auto flex flex-col justify-center gap-6 items-center'>
      <p>Please enter otp below:</p>
     <OTP setOTP={setOTP}/>
     <button onClick={handleSubmit} className='bg-[#AFB3FF] rounded-full px-5 py-1 text-white'>Verify</button>
     <button onClick={resendOtp} className='bg-[#AFB3FF] rounded-full px-5 py-1 text-white'>Resend otp</button></div>
     </div>
  )
}

export default Page