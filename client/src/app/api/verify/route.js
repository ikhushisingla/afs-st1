import { NextResponse } from "next/server";
import axios from 'axios';
export async function POST(req,res){
    try{
        const {email,otp}=await req.json();
        console.log(email,otp);

        const res=await axios.post('http://localhost:8080/api/auth/verify',{email,otp});
        console.log(res);
        return NextResponse.json({data:res.data});

    }catch(error){
        return NextResponse.json({error})
    }
}