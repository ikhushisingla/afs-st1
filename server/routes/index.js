const express=require('express');
const router=express.Router();
const {login,signup,verify,resendOtp}=require('../controllers')

router.post('/signup',signup)
router.post('/login',login)
router.post('/verify',verify)
router.post('/resend-otp',resendOtp)
module.exports=router;