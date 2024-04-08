// notificationUtility.ts
// var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
//     function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
//     return new (P || (P = Promise))(function (resolve, reject) {
//         function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
//         function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
//         function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
//         step((generator = generator.apply(thisArg, _arguments || [])).next());
//     });
// };
import nodemailer from 'nodemailer';

// Function to send notifications via email
export default async function sendNotificationByEmail(email, subject, message) {
        try {
            // nodemailer transporter with your SMTP configuration
            const transporter = nodemailer.createTransport({
                host: 'smtp.example.com',
                port: 587,
                secure: false,
                auth: {
                    user: 'your-email@example.com',
                    pass: 'your-email-password',
                },
            });
            // Send mail with defined transport object
            await transporter.sendMail({
                from: '"Your Name" <your-email@example.com>',
                to: email,
                subject,
                text: message,
                // HTML body
                // html: '<p> HTML message here</p>',
            });
            console.log('Notification sent successfully to:', email);
        }
        catch (error) {
            console.error('Error sending notification:', error);
            throw new Error('Failed to send notification');
        }
    }
    
