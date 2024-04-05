// Import necessary modules
import { Router } from 'express';
import ServiceController from '../controllers/ServiceController.js';

// Create a router instance
const router = Router();

const ServiceCont = new ServiceController();

// Define routes
router.post('/Service/:id/createService', ServiceCont.createService);
router.put('/Service/:id/updateService', ServiceCont.updateService);
router.get('/Service/:id/getServiceById', ServiceCont.getServiceById);
router.get('/Service/getAllServices', ServiceCont.getAllServices);
router.delete('/Service/:id/deleteService', ServiceCont.deleteService);

// Export the router
export default router;
