// var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
//     function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
//     return new (P || (P = Promise))(function (resolve, reject) {
//         function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
//         function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
//         function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
//         step((generator = generator.apply(thisArg, _arguments || [])).next());
//     });
// };

import vistorsAnalyticsModel from '../models/vistorsAnalytics.js';

class VisitorAnalyticsController {
    /**
     * Method to fetch all visitor analytics data.
     * @param req Request object.
     * @param res Response object to send the visitor analytics data.
     */
    async getAllVisitorAnalytics(req, res) {
            try {
                // Call the method from VisitorAnalyticsModel to fetch all visitor analytics data
                const visitorAnalyticsData = await vistorsAnalyticsModel.getAllVisitorAnalytics();
                // Return the visitor analytics data in the response
                res.status(200).json(visitorAnalyticsData);
            }
            catch (error) {
                // Handle errors
                console.error('Error fetching visitor analytics:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
    }
    /**
 * Method to create new visitor analytics data.
 * @param req Request object containing visitor analytics data.
 * @param res Response object to send the result.
 */
    async createVisitorAnalytics(req, res) {
            try {
                const visitorAnalyticsData = req.body;
                const newVisitorAnalytics = await vistorsAnalyticsModel.createVisitorsAnalytics(visitorAnalyticsData);
                res.status(201).json(newVisitorAnalytics);
            }
            catch (error) {
                // Handle errors
                console.error('Error creating visitor analytics:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
    }
    /**
     * Method to fetch visitor analytics data by ID.
     * @param req Request object containing the visitor analytics ID.
     * @param res Response object to send the visitor analytics data.
     */
    async getVisitorAnalyticsById(req, res) {
            try {
                // Extract visitor analytics ID from request parameters
                const { id } = req.params;
                // Call the method from VisitorAnalyticsModel to fetch visitor analytics data by ID
                const visitorAnalyticsData = await vistorsAnalyticsModel.getVisitorAnalyticsById(id);
                // Return the visitor analytics data in the response
                if (visitorAnalyticsData) {
                    res.status(200).json(visitorAnalyticsData);
                }
                else {
                    res.status(404).json({ error: 'Visitor analytics not found' });
                }
            }
            catch (error) {
                // Handle errors
                console.error('Error fetching visitor analytics by ID:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
    }
    /**
     * Method to update visitor analytics data by ID.
     * @param req Request object containing the visitor analytics ID and updated data.
     * @param res Response object to send the updated visitor analytics data.
     */
    async updateVisitorAnalytics(req, res) {
            try {
                // Extract visitor analytics ID and updated data from request body
                const { id } = req.params;
                const updatedVisitorAnalyticsData = req.body;
                // Call the method from VisitorAnalyticsModel to update visitor analytics data by ID
                const updatedVisitorAnalytics = await vistorsAnalyticsModel.updateVisitorAnalytics(id, updatedVisitorAnalyticsData);
                // Return the updated visitor analytics data in the response
                if (updatedVisitorAnalytics) {
                    res.status(200).json(updatedVisitorAnalytics);
                }
                else {
                    res.status(404).json({ error: 'Visitor analytics not found' });
                }
            }
            catch (error) {
                // Handle errors
                console.error('Error updating visitor analytics:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
    }
    /**
     * Method to delete visitor analytics data by ID.
     * @param req Request object containing the visitor analytics ID.
     * @param res Response object to send the result.
     */
    async deleteVisitorAnalytics(req, res) {
            try {
                // Extract visitor analytics ID from request parameters
                const { id } = req.params;
                // Call the method from VisitorAnalyticsModel to delete visitor analytics data by ID
                const deletedVisitorAnalytics = await vistorsAnalyticsModel.deleteVisitorAnalytics(id);
                // Return success message in the response
                if (deletedVisitorAnalytics) {
                    res.status(200).json({ message: 'Visitor analytics deleted successfully' });
                }
                else {
                    res.status(404).json({ error: 'Visitor analytics not found' });
                }
            }
            catch (error) {
                // Handle errors
                console.error('Error deleting visitor analytics:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
    }
}
// hijokl
export default VisitorAnalyticsController;
