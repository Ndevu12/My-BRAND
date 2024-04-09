// const necessary modules
import express from 'express';
import SubscriberController from '../controllers/subscriberController.js';

// Create a router instance
const router = express.Router();

const SubscriberCont = new SubscriberController();

// Define routes
router.post('/Subscriber/:id/createSubscriber', SubscriberCont.createSubscriber);
router.put('/Subscriber/:id/updateSubscriber', SubscriberCont.updateSubscriber);
router.get('/Subscriber/:id/getSubscriberById', SubscriberCont.getSubscriberById);
router.get('/Subscriber/:id/getAllSubscribers', SubscriberCont.getAllSubscribers);
router.delete('/Subscriber/:id/deleteSubscriber', SubscriberCont.deleteSubscriber);

// hijokl
// Export the router
export default router;
