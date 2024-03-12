import { NextResponse } from "next/server";
import axios from 'axios';
export async function POST(req,res){
    try{
        const {email}=await req.json();
        console.log(email);

        const res=await axios.post(process.env.BASE_URL+'/auth/resend-otp',{email});
        console.log(res);
        return NextResponse.json({data:res.data});

    }catch(error){
        return NextResponse.json({error})
    }
}