// const necessary modules
import express from 'express';
import ExperienceController from '../controllers/experienceController.js';

// Create a router instance
const router = express.Router();
const ExperienceCont = new ExperienceController();

// Define routes
router.post('/Experience/:id/createExperience', ExperienceCont.createExperience);
router.put('/Experience/:id/updateExperience', ExperienceCont.updateExperience);
router.get('/Experience/:id/getExperienceById', ExperienceCont.getExperienceById);
router.get('/Experience/getAllExperiences', ExperienceCont.getAllExperiences);
router.delete('/Experience/:id/deleteExperience', ExperienceCont.deleteExperience);

// Export the router
export default router;
