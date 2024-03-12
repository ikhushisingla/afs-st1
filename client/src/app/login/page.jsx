'use client'
import axios from 'axios'
import React, { useState } from 'react'
import toast  from 'react-hot-toast';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/navigation'
import useUserState from '@/hooks/use-user';
import FormContainer from '@/components/formContainer';

const Page = () => {
  const setUser=useUserState(state=>state.setUser);
  const router=useRouter();
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const email=e.target.email.value
    const password=e.target.password.value;
    const res=await axios.post('/api/login',{email,password});
      console.log(res)
      if(res.data.data){
        toast.success('login successful');
        setUser(res.data.data.user);
        if(res.data.data.user.isVerified){
           router.replace('/')
        }
        else   router.replace('/verify')
      }
      else{
        toast.error(res.data.error.message)
      }
    
    }
    
  return (
        <div className='max-w-screen-2xl w-full h-screen flex items-center'>
<FormContainer>           <p className='text-center py-3 font-semibold'>Welcome!</p>
            <form className='flex flex-col' onSubmit={handleSubmit}>
                <label className='py-2 sm:py-1'>Email:
                </label>
                <input id='email' type='email' name='email' className='border bg-inherit border-[#AFB3FF] focus:outline-none rounded-full px-3 sm:px-1'/>

                <label className='py-2 sm:py-1'>Password:
                </label>
                <input id='password' type='password' name='password' className='border bg-inherit border-[#AFB3FF] focus:outline-none rounded-full px-3'/>

                <button type='submit' className='bg-[#656ED3] rounded-full px-2 mt-12 py-1 text-white sm:px-1'>Login</button>
            </form>
            <p className='py-4 text-center'>Dont have an account? <Link href="/signup" className='font-semibold'>SignUp</Link></p>
            </FormContainer>
        <div className='w-1/2 max-lg:hidden h-full flex items-center relative'>
            <div className='absolute right-0 h-full w-2/3 bg-[#AFB3FF]'></div>
            <Image className='isolate' src={'/computer.png'} height={550} width={550}/>
        </div>
    </div>
  )
}

export default Page