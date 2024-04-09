// // Import necessary modules for sending emails and SMS

//           // For sending emails
// import nodemailer from 'nodemailer'; 
//          // For sending SMS
// import twilio from 'twilio'; 

// /**
//  * Utility function to send authorization code to both email and phone number.
//  * @param email The email address to send the authorization code.
//  * @param phone The phone number to send the authorization code.
//  * @returns A promise that resolves to a boolean indicating whether the sending was successful.
//  */
// export async function sendAuthorizationCodeByEmailAndPhone(email: string, phone: string): Promise<boolean> {
//     try {
//         // Generate authorization code
//         const authorizationCode = generateAuthorizationCode();

//         // Send authorization code to email
//         const emailSent = await sendEmail(email, authorizationCode);

//         // Send authorization code to phone number
//         const smsSent = await sendSMS(phone, authorizationCode);

//         // Return true if both email and SMS were sent successfully
//         return emailSent && smsSent;
//     } catch (error) {
//         console.error('Error sending authorization code:', error);
//         return false;
//     }
// }

// /**
//  * Function to send email with authorization code.
//  * @param email The email address to send the message.
//  * @param code The authorization code to include in the message.
//  * @returns A promise that resolves to a boolean indicating whether the email was sent successfully.
//  */
// async function sendEmail(email: string, code: string): Promise<boolean> {
//     try {
//         // Create nodemailer transporter
//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: process.env.EMAIL_USER, // Your Gmail username
//                 pass: process.env.EMAIL_PASS // Your Gmail password or app password
//             }
//         });

//         // Define email options
//         const mailOptions = {
//             from: process.env.EMAIL_USER, // Sender email address
//             to: email, // Recipient email address
//             subject: 'Authorization Code', // Email subject
//             text: `Your authorization code is: ${code}` // Email body
//         };

//         // Send email
//         const info = await transporter.sendMail(mailOptions);

//         console.log('Email sent:', info.response);
//         return true;
//     } catch (error) {
//         console.error('Error sending email:', error);
//         return false;
//     }
// }

// /**
//  * Function to send SMS with authorization code.
//  * @param phone The phone number to send the message.
//  * @param code The authorization code to include in the message.
//  * @returns A promise that resolves to a boolean indicating whether the SMS was sent successfully.
//  */
// async function sendSMS(phone: string, code: string): Promise<boolean> {
//     try {
//         // Create Twilio client
//         const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

//         // Send SMS
//         await client.messages.create({
//             body: `Your authorization code is: ${code}`,
//             from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
//             to: phone
//         });

//         console.log('SMS sent successfully');
//         return true;
//     } catch (error) {
//         console.error('Error sending SMS:', error);
//         return false;
//     }
// }

// /**
//  * Function to generate a random 4-digit authorization code.
//  * @returns A 4-digit random authorization code.
//  */
// function generateAuthorizationCode(): string {
//     return Math.floor(1000 + Math.random() * 9000).toString();
// }
