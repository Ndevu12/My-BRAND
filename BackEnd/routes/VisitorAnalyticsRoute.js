// const necessary modules
import express from'express';
import VisitorAnalyticsController from '../controllers/VisitorAnalyticsController.js';

// Create a router instance
const router = express.Router();

const VisitorAnalyticsCont = new VisitorAnalyticsController();

// Define routes
router.post('/VisitorAnalytics/:id/createVisitorAnalytics', VisitorAnalyticsCont.createVisitorAnalytics);
router.put('/VisitorAnalytics/:id/updateVisitorAnalytics', VisitorAnalyticsCont.updateVisitorAnalytics);
router.get('/VisitorAnalytics/:id/getVisitorAnalyticsById', VisitorAnalyticsCont.getVisitorAnalyticsById);
router.get('/VisitorAnalytics/getAllVisitorAnalytics', VisitorAnalyticsCont.getAllVisitorAnalytics);
router.delete('/VisitorAnalytics/:id/deleteVisitorAnalytics', VisitorAnalyticsCont.deleteVisitorAnalytics);

// hijokl
// Export the router
export default router;
