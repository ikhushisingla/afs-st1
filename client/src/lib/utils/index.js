import axios from 'axios';
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const client=axios.create({baseURL:'http://localhost:8080/api',headers:{
    'Accept':'application/json'
}});

 
 
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
 
