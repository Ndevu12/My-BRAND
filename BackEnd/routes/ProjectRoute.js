// Import necessary modules
import express from 'express';
import ProjectController from '../controllers/ProjectController.js';

// Create a router instance
const router = express.Router();

const ProjectCon  = new ProjectController();

// Define routes
router.post('/Project/:id/createProject', ProjectCon.createProject);
router.put('/Project/:id/updateProject', ProjectCon.updateProject);
router.get('/Project/:id/getProjectById', ProjectCon.getProjectById);
router.get('/Project/getAllProjects', ProjectCon.getAllProjects);
router.delete('/Project/:id/deleteProject', ProjectCon.deleteProject);
// hijokl
// Export the router
export default router;
