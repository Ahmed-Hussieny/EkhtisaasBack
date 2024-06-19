
//send email service

import nodemailer from 'nodemailer'
const sendEmailService = async({
    to,
    subject="no reply",
    message='<h1>no-message</h1>',
    attachments=[]
})=>{
    // email configration
    const transporter  = nodemailer.createTransport({
        host:'localhost' // smtp.gmail.com
        ,service:'gmail',
        port:465, // ^ if 587 secure => false
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASSWORD
        }
    })
    const info = await transporter.sendMail({
        from:`${process.env.EMAIL}`,// sender address
        to,
        subject,
        html:message,
        attachments
    })
    // console.log(info);
    return info.accepted.length ? true : false;
}
export default sendEmailService;