// const necessary modules
import { Router } from 'express';
import ProfileController from '../controllers/ProfileController.js';

// Create a router instance
const router = Router();

const ProfileCont = new ProfileController();

// Define routes
router.post('/Profile/:id/createProfile', ProfileCont.createProfile);
router.put('/Profile/:id/updateProfile', ProfileCont.updateProfile);
router.get('/Profile/:id/getProfileById', ProfileCont.getProfileById);
router.get('/Profile/getAllProfiles', ProfileCont.getAllProfiles);
router.delete('/Profile/:id/deleteProfile', ProfileCont.deleteProfile);

// Export the router
export default router;
