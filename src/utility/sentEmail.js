const nodemailer=require('nodemailer');

const EmailSend=async (emailTo,subject,text)=>{
    let transporter = nodemailer.createTransport({
        host: 'mail.teamrabbil.com',
        port: 25,
        secure: false,
        auth: {
            user: "info@teamrabbil.com",
            pass: '~sR4[bhaC[Qs'
        },tls: {
            rejectUnauthorized: false
        },
    });

    let mailOptions = {
        from: 'Inventory <info@teamrabbil.com>',
        to: emailTo,
        subject: subject,
        text: text
    };

    return  await transporter.sendMail(mailOptions)
}

module.exports=EmailSend;