// // notificationUtility.ts

// import nodemailer from 'nodemailer';

// // Function to send notifications via email
// export async function sendNotificationByEmail(email: string, subject: string, message: string): Promise<void> {
//     try {
//         // nodemailer transporter with your SMTP configuration
//         const transporter = nodemailer.createTransport({
//             host: 'smtp.example.com',
//             port: 587,
//             secure: false,
//             auth: {
//                 user: 'your-email@example.com',
//                 pass: 'your-email-password',
//             },
//         });

//         // Send mail with defined transport object
//         await transporter.sendMail({
//             from: '"Your Name" <your-email@example.com>',
//             to: email,
//             subject,
//             text: message,
//             // HTML body
//             // html: '<p> HTML message here</p>',
//         });

//         console.log('Notification sent successfully to:', email);
//     } catch (error) {
//         console.error('Error sending notification:', error);
//         throw new Error('Failed to send notification');
//     }
// }
