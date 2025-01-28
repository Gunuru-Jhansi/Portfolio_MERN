const nodemailer = require('nodemailer');
const brevoTransport =require('nodemailer-brevo-transport');

//transport
const transporter = nodemailer.createTransport(
    new brevoTransport(
         {
            apiKey : process.env.API_BREVO ,
        }
    
));
module.exports = transporter;

const sendEmailController=async(req,res)=>{
            try{
                const {name,email,msg}=req.body
                //validation
                if(!name|| !email || !msg){
                    return res.status(400).json({
                        success:false,
                        message:"Please Provide All Fields"
                    })
                }
                //email matter
                await transporter.sendMail({
                    to:"chugachimrj@gmail.com",
                    from:"gunurujhansi@gmail.com",
                    subject:'Regarding MERN Portfolio App',
                    html: 
                    `<html>
                    <body>
                    <h5>Detailed Information</h5>
                    <ul>
                        <li><p>Name: ${name}</p></li>
                        <li><p>Email: ${email}</p></li>
                        <li><p>Message: ${msg}</p></li>
                    </ul>
                    </body>
                    </html>
                    `,
                });
                return res.status(200).json({
                    success:true,
                    message:"Your Message Sent successfully !",
                });

            }
            catch(error){
                    console.error("Error while sending email:",error)
                    return res.status(500).json({
                        success:false,
                        message: "Failed to send your message .Please try again later",
                        
                    });
            }
};
module.exports = {sendEmailController} ;