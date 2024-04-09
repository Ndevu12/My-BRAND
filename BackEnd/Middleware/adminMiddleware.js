"use strict";
// // adminMiddleware.ts
import AdminModel, { IAdmin } from '../models/adminModel';
import { Request, Response, NextFunction } from 'express';
// Middleware to check if the user is an administrator
export const isAdmin = (req, res, next) => {
    // Check if the user is authenticated and has admin role
    if (req.Admin && req.Admin.role === 'admin') {
        // User is an admin, proceed to next middleware
        next();
    } else {
        // User is not an admin, deny access
        res.status(403).json({ message: 'Access denied. Only administrators are allowed.' });
    }
};
