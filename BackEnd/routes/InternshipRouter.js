// const necessary modules
import express from 'express';
import InternshipController from '../controllers/InternshipController.js';

// Create a router instance
const router = express.Router();

const InternshipCont = new InternshipController();

// Define routes
router.post('/Internship/:id/createInternship', InternshipCont.createInternship);
router.put('/Internship/:id/updateInternship', InternshipCont.updateInternship);
router.get('/Internship/:id/getInternshipById', InternshipCont.getInternshipById)
router.get('/Internship/getAllInternships', InternshipCont.getAllInternships);;
router.delete('/Internship/:id/deleteInternship', InternshipCont.deleteInternship);

// Export the router
export default router;
