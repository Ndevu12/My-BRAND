// var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
//     function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
//     return new (P || (P = Promise))(function (resolve, reject) {
//         function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
//         function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
//         function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
//         step((generator = generator.apply(thisArg, _arguments || [])).next());
//     });
// };

import AdminModel from '../models/adminModel.js';
import ValidationUtils from '../utils/validationUtils.js';
import { hash, compare } from 'bcrypt';
import pkg from 'jsonwebtoken';
import { sendAuthorizationCodeByEmailAndPhone } from '../utils/authorizationUtils.js';

const { sign } = pkg;

class AdminController {
    // Method to register a new admin
    async registerAdmin(req, res) {
            try {
                const { username, password, email, phoneNumber, fullName } = req.body;

                // Check if admin already exists
                const existingAdmin = await AdminModel.findAdmin();
                if (existingAdmin) {
                    res.status(400).json({ message: 'Admin already exists, You can explore a website OR Login if you are ADMIN' });
                    return;
                }
                // Hash the password before saving
                const hashedPassword = await hash(password, 10);
                // const  phoneNumber  = req.body;
                // Validate phone number
                if (!ValidationUtils.validatePhoneNumber(phoneNumber)) {
                    res.status(400).json({ message: 'Invalid phone number' });
                    return;
                }
                // Create admin object
                const newAdmin = {
                    username,
                    password: hashedPassword,
                    email,
                    phoneNumber,
                    fullName,
                    role: 'admin', 
                };
                // Save the admin to the database
                const createdAdmin = await AdminModel.createAdmin(newAdmin);
                res.status(201).json(createdAdmin);
            }
            catch (error) {
                console.error('Error registering admin:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        }

    // Method to login admin
    async loginAdmin(req, res) {
            try {
                const { username, password } = req.body;
                // Find admin by username
                const admin = await AdminModel.findOne({ username });
                if (!admin) {
                    res.status(401).json({ message: 'Invalid username' });
                    return;
                }
                // Check password
                const passwordMatch = await compare(password, admin.password);
                if (!passwordMatch) {
                    res.status(401).json({ message: 'Invalid password' });
                    return;
                }
                // Generate JWT token
                const token = sign({ id: admin._id }, process.env.JWT_SECRET || '', { expiresIn: '1h' });
                // Send authorization code via email and phone
                const isCodeSent = await sendAuthorizationCodeByEmailAndPhone(admin.email, admin.phoneNumber);
                if (isCodeSent) {
                    res.status(200).json({ token, message: 'Authorization code sent successfully' });
                }
                else {
                    res.status(500).json({ error: 'Failed to send authorization code' });
                }
            }
            catch (error) {
                console.error('Error logging in admin:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        }

    async updateAdminData(req, res) {
        try{
            const admin = req.body;
            const {id} = req.body;
            const update = await AdminModel.updateAdmin(id, admin);

            if (update){
                console.log("Admin updated successfully");
                res.status(200).json(update);
            }
            
        }catch(error) {
         console.error("Error updating admin", error);
         res.status(500).json({error: "Error updating admin"});
        }
    }

    async removeAdmin(req, res) {
        try{
        const {id} = req.pramas._id;
        const remove = await AdminModel.deleteAdmin(id);

        if(remove) {
            console.log("Admin removed successfully");
            res.status(200).joson(remove);
        }
    }catch(e) {
        console.error("Admin not deleted", e);
        res.status(404).json({error: "Error while removing admin"});
    }

    }
    }

export default AdminController;
