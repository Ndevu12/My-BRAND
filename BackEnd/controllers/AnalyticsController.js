// var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
//     function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
//     return new (P || (P = Promise))(function (resolve, reject) {
//         function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
//         function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
//         function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
//         step((generator = generator.apply(thisArg, _arguments || [])).next());
//     });
// };

import AnalyticsModel from '../models/Analytics';

class AnalyticsController {
    /**
     * Method to create a new analytics model.
     * @param req Request object containing analytics model data.
     * @param res Response object to send the result.
     */

    async createAnalytics(req, res) {
            try {
                const AnalyticsData = req.body;
                const newAnalytics = await AnalyticsModel.createAnalytics(AnalyticsData);
                res.status(201).json(newAnalytics);
            }
            catch (error) {
                console.error('Error creating analytics model:', error);
                res.status(500).send('Internal Server Error');
            }
    }
    // hijokl
    /**
     * Method to retrieve all analytics models.
     * @param req Request object.
     * @param res Response object to send the analytics models.
     */
    async getAllAnalyticss(req, res) {
            try {
                const Analyticss = await AnalyticsModel.getAllAnalyticss();
                res.status(200).json(Analyticss);
            }
            catch (error) {
                console.error('Error fetching analytics models:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
    }
    /**
     * Method to retrieve an analytics model by its ID.
     * @param req Request object containing the analytics model ID.
     * @param res Response object to send the analytics model.
     */
    async getAnalyticsById(req, res) {
            try {
                const { id } = req.params;
                const newAnalytics = await AnalyticsModel.findAnalyticsById(id);
                if (newAnalytics) {
                    res.status(200).json(newAnalytics);
                }
                else {
                    res.status(404).json({ error: 'Analytics model not found' });
                }
            }
            catch (error) {
                console.error('Error fetching analytics model by ID:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
    }
    /**
     * Method to update an analytics model by its ID.
     * @param req Request object containing the analytics model ID and updated data.
     * @param res Response object to send the updated analytics model.
     */
    async updateAnalytics(req, res) {
            try {
                const { id } = req.params;
                const updatedAnalyticsData = req.body;
                const updatedAnalytics = await AnalyticsModel.updateAnalytics(id, updatedAnalyticsData);
                if (updatedAnalytics) {
                    res.status(200).json(updatedAnalytics);
                }
                else {
                    res.status(404).json({ error: 'Analytics model not found' });
                }
            }
            catch (error) {
                console.error('Error updating analytics model:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
    }
    /**
     * Method to delete an analytics model by its ID.
     * @param req Request object containing the analytics model ID.
     * @param res Response object to send the result.
     */
    async deleteAnalytics(req, res) {
            try {
                const { id } = req.params;
                const deletedAnalytics = await AnalyticsModel.deleteAnalytics(id);
                if (deletedAnalytics) {
                    res.status(200).json({ message: 'Analytics model deleted successfully' });
                }
                else {
                    res.status(404).json({ error: 'Analytics model not found' });
                }
            }
            catch (error) {
                console.error('Error deleting analytics model:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
    }
}
export default AnalyticsController;
