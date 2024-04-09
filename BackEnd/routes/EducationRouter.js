// const necessary modules
import express from 'express';
import EducationController from '../controllers/EducationController.js';

// Create a router instance
const router = express.Router();
const EducationCont = new EducationController();

// Define routes

router.post('/Education/:id/createEducation', EducationCont.createEducation);
router.put('/Education/:id/updateEducation', EducationCont.updateEducation);
router.get('/Education/:id/getEducationById', EducationCont.getEducationById);
router.get('/Education/:id/getAllEducations', EducationCont.getAllEducations);
router.delete('/Education/:id/deleteEducation', EducationCont.deleteEducation);

// hijokl
// Export the router
export default router;
