"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import useUserState from "@/hooks/use-user";
import { useRouter } from "next/navigation";

 const Navbar=()=> {
    const {user,setUser}=useUserState(state=>state);
    const router=useRouter()
    const handleSubmit=async()=>{
        if(user.isVerified){
          setUser(null)
          router.replace('/')
        }
    }
    

  return (
    <div className="bg-slate-950  top-10 inset-x-0 w-full text-white px-8 py-4 mx-auto z-50">
        <div className="ml-auto w-fit">
            {user?
            <div className="flex gap-4">
              <h1>{user.name}</h1>
              <button type="submit" onClick={handleSubmit} className="hover:text-slate-400 hover:underline transition-all">LogOut</button>
            </div>
              
              :
              <Link href='/login' className="hover:text-slate-400 hover:underline transition-all">Login</Link>
            }
        </div>
    </div>
  );
}
export default Navbar