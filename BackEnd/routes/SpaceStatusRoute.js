// const necessary modules
import express from 'express';
import SpaceStatusController from '../controllers/spaceStatusController.js';

// Create a router instance
const router = express.Router();

const SpaceStatusCont = new SpaceStatusController();

// Define routes
router.post('/SpaceStatus/:id/createSpaceStatus', SpaceStatusCont.createSpaceStatus);
router.put('/SpaceStatus/:id/updateSpaceStatus', SpaceStatusCont.updateSpaceStatus);
router.get('/SpaceStatus/:id/getSpaceStatusById', SpaceStatusCont.getSpaceStatusById);
router.get('/SpaceStatus/getAllSpaceStatuses', SpaceStatusCont.getAllSpaceStatuses);
router.delete('/SpaceStatus/:id/deleteSpaceStatus', SpaceStatusCont.deleteSpaceStatus);

// Export the router
export default router;
