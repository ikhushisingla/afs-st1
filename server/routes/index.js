const express=require('express');
const router=express.Router();
const {login,signup,verify}=require('../controllers')

router.post('/signup',signup)
router.post('/login',login)
router.post('/verify',verify)
module.exports=router;