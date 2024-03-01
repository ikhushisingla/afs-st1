const nodemailer=require("nodemailer")
module.exports=async(email,subject,text)=>{
    try{
        const transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            service:process.env.SERVICE,
            secure:Boolean(process.env.SECURE),
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },
        })
        await transporter.sendMail({
            from:process.env.MAIL_USER,
            to:email,
            subject:subject,
            html:text,
        })
        console.log("Email sent")
    }
    catch(err){
        console.error(err)
    }
}