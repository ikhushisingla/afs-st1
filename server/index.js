const express = require("express");
const route=require('./routes')
const app = express();
const database=require("./config/database")
const cors = require("cors");
const morgan=require('morgan');
const dotenv = require("dotenv");
dotenv.config();
app.use(morgan('dev'))

const PORT = process.env.PORT || 8080;
database.connect();

app.use(express.json());

app.use(
    cors({
      origin: 'https://afs-st1-omega.vercel.app',
      credentials: true,
      maxAge: 14400,
    })
  );


  app.use('/api/auth',route);

  app.use('/',(req,res)=>{
    res.send('Server is working!!')
  })

  app.listen(PORT,()=>{console.log("Server running on port " +PORT)})


  // verify otp, login system