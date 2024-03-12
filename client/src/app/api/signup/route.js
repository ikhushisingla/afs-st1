import { NextResponse } from "next/server";
import axios from 'axios';
export async function POST(req,res){
    try{
        const {email,password,name,confirmPassword}=await req.json();
        if(password!=confirmPassword){
            return NextResponse.json({error:{message:"Password Mismatch"}});
        }
        const res=await axios.post('http://localhost:8080/api/auth/signup',{name,email,password});
        console.log(res);
        return NextResponse.json({data:res.data});

    }catch(error){
        return NextResponse.json({error})
    }
} 