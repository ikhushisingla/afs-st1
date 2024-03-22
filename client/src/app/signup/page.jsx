'use client'
import toast from 'react-hot-toast'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import FormContainer from '@/components/formContainer'

const Page = () => {
  const [loading, setloading] = useState(false);

  const router=useRouter()
    const handleSubmit=async(e)=>{
      try{
        setloading(true);
        e.preventDefault();
        const name=e.target.name.value
        const email=e.target.email.value
        const password=e.target.password.value;
        const confirmPassword=e.target.confirmPassword.value;
        const res=await axios.post('/api/signup',{name,email,password,confirmPassword});
          console.log(res)
          if(res.data.data){
            toast.success('signup successful');
            router.replace('/login')
          }
          else{
            toast.error(res.data.error.message)
          }
      }
      catch(err){
        console.log(err)
      }
        setloading(false)
        }
  return (
    <div className='max-w-screen-2xl w-full h-screen flex items-center'>
        <div className='w-1/2 max-lg:hidden h-full relative'>
        {/* max-md:hidden */}
            <Image src={'/Rectangle.png'} width={375} height={375}  className='left-12 absolute '/>
            <Image src={'/desk.png'} width={425} height={425} className='relative left-44 mt-44 '/>
        </div>
        <FormContainer>
                <p className='text-center font-semibold'>Please fill out the form to SignUp</p>
                <form className='flex flex-col' onSubmit={handleSubmit}>
                    <label className='py-2'>Name:</label>
                    <input id='name' type='text' name='name' className='border bg-inherit border-[#AFB3FF] focus:outline-none rounded-full px-3'/>
                    <label className='py-2'>Email:</label>
                    <input id='email' type='email' name='email' className='border bg-inherit border-[#AFB3FF] focus:outline-none rounded-full px-3'/>
                    <label className='py-2'>Password:
                    </label>
                    <input id='password' type='password' name='password' className='border bg-inherit border-[#AFB3FF] focus:outline-none rounded-full px-3'/>
                    <label className='py-2'>Confirm Password:
                    </label>
                    <input id='confirmPassword' type='password' name='confirmPassword' className='border bg-inherit border-[#AFB3FF] focus:outline-none rounded-full px-3'/>

                    <button type='submit' className='bg-[#656ED3] rounded-full px-2 mt-12 py-1 text-white'>{loading?<span className='loader'></span>:'SignUp'}</button>
                </form>
                <p className='py-4 text-center'>Already have an account? <Link href="/login" className='font-bold'>LogIn</Link></p>
                </FormContainer>
    </div>
  )
}

export default Page