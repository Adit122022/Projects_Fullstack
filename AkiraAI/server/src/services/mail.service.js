import nodemailer from "nodemailer"
import { Project_Name } from "../lib/mailFormate.js"


const gUser =process.env.GOOGLE_USER
const gClient_Id = process.env.GOOGLE_CLIENT_ID
const gClient_Secret = process.env.GOOGLE_CLIENT_SECRET
const gRefresh_Token = process.env.GOOGLE_REFRESH_TOKEN


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: gUser,
    clientId: gClient_Id,
    clientSecret: gClient_Secret,
    refreshToken: gRefresh_Token ,
  },
});

// Verify the connection configuration
transporter.verify()
.then(()=> console.log('Email server is ready to send messages'))
.catch((error)=> console.error('Error connecting to email server:', error))
 

/**
 * Send E-Mail using Transporter
 */
export async function sendEmail ({to, subject, text, html}){
  try {
    const mailOptions ={
      from: `${Project_Name} <${gUser}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    }

    const info = await transporter.sendMail(mailOptions);

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};