import { Router } from 'express';
// const AdminController from '../controllers/adminController');
import AdminController from '../controllers/adminController.js';

const router = Router();

const AdminCont = new AdminController();

// Route to register a new admin
router.post('/admin/:id/register',AdminCont.registerAdmin);
router.get('/admin/:id/login',AdminCont.loginAdmin);
// router.get('/admin',AdminCont.registerAdmin);
// router.get('/admin',AdminCont.registerAdmin);
// router.post('/admin',AdminCont.registerAdmin);
// router.post('/admin',AdminCont.registerAdmin);
router.put('/admin/:id/updateAdminData',AdminCont.updateAdminData);
router.delete('/admin/:id/removeAdmin',AdminCont.removeAdmin);

export default router;
