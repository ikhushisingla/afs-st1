"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import useUserState from "@/hooks/use-user";

export default function Navbar() {
    const user=useUserState(state=>state.user);
  return (
    <div
      className=
      "bg-slate-950  top-10 inset-x-0 w-full text-white px-8 py-4 mx-auto z-50"
    >
        <div className="ml-auto w-fit">
{user?<h1>{user.name}</h1>:<Link href='/login' className="hover:text-slate-400 hover:underline transition-all">Login</Link>
}
        </div>
    </div>
  );
}
