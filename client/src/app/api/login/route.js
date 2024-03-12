import { NextResponse } from "next/server";
import axios from 'axios';
export async function POST(req,res){
    try{
        const {email,password}=await req.json();
        console.log(email,password);

        const res=await axios.post('http://localhost:8080/api/auth/login',{email,password});
        console.log(res);
        return NextResponse.json({data:res.data});

    }catch(error){
        return NextResponse.json({error})
    }
}