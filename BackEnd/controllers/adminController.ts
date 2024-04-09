import { Request, Response } from 'express';
import AdminModel, { IAdmin } from '../models/adminModel';
import ValidationUtils from '../utils/validationUtils';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendAuthorizationCodeByEmailAndPhone } from '../utils/authorizationUtils';

class AdminController {
    // Method to register a new admin
    public async registerAdmin(req: Request, res: Response): Promise<void> {
        try {
            const { username, password, email, phoneNumber, fullName } = req.body;

            // Check if admin with the same username or email already exists
            const existingAdmin = await AdminModel.findOne({ $or: [{ username }, { email }] });
            if (existingAdmin) {
                res.status(400).json({ message: 'Username or email already exists' });
                return;
            }

            // Hash the password before saving
            const hashedPassword = await bcrypt.hash(password, 10);

            // const  phoneNumber  = req.body;

            // Validate phone number
            if (!ValidationUtils.validatePhoneNumber(phoneNumber)) {
                res.status(400).json({ message: 'Invalid phone number' });
                return;
            }

            // Create admin object
            const newAdmin: Partial<IAdmin> = {
                username,
                password: hashedPassword,
                email,
                phoneNumber,
                fullName,
                role: 'admin', // Set role as admin
            };

            // Save the admin to the database
            const createdAdmin = await AdminModel.create(newAdmin);

            res.status(201).json(createdAdmin);
        } catch (error) {
            console.error('Error registering admin:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    // Method to login admin
    public async loginAdmin(req: Request, res: Response): Promise<void> {
        try {
            const { username, password } = req.body;

            // Find admin by username
            const admin = await AdminModel.findOne({ username });

            if (!admin) {
                res.status(401).json({ message: 'Invalid username or password' });
                return;
            }

            // Check password
            const passwordMatch = await bcrypt.compare(password, admin.password);
            if (!passwordMatch) {
                res.status(401).json({ message: 'Invalid username or password' });
                return;
            }

            // Generate JWT token
            const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET || '', { expiresIn: '1h' });

            // Send authorization code via email and phone
            const isCodeSent = await sendAuthorizationCodeByEmailAndPhone(admin.email, admin.phoneNumber);

            if (isCodeSent) {
                res.status(200).json({ token, message: 'Authorization code sent successfully' });
            } else {
                res.status(500).json({ error: 'Failed to send authorization code' });
            }
        } catch (error) {
            console.error('Error logging in admin:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export default new AdminController();
