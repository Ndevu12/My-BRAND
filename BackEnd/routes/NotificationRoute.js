// const necessary modules
import { Router } from 'express';
import notificationController from '../controllers/notificationController.js';

// Create a router instance
const router = Router();

const notificationCont = new notificationController();
// Define routes
router.post('/notification/:id/createNotification', notificationCont.createNotification);
router.put('/notification/:id/updateNotification', notificationCont.updateNotification);
router.get('/notification/:id/getNotificationById', notificationCont.getNotificationById);
router.get('/notification/getAllNotifications', notificationCont.getAllNotifications);
router.delete('/notification/:id/deleteNotification', notificationCont.deleteNotification);

// Export the router
export default router;
