// Import necessary modules
import { Router } from 'express';
import AnalyticsController from '../controllers/AnalyticsController.js';

// Create a router instance
const AnalyticsRouter = Router();

const analytics = new AnalyticsController();
// Define routes
AnalyticsRouter.get('/analytics/:id/getAllAnalyticss)', analytics.getAllAnalyticss);
AnalyticsRouter.get('/analytics/getAnalyticsById', analytics.getAnalyticsById);
AnalyticsRouter.post('/analytics/:id/createAnalytics', analytics.createAnalytics);
AnalyticsRouter.put('/analytics/:id/updateAnalytics', analytics.updateAnalytics);
AnalyticsRouter.delete('/analytics/:id/deleteAnalytics', analytics.deleteAnalytics);

// hijokl
// Export the router
export default AnalyticsRouter;
