/**
 * Controller for handling Analytics-related operations.
 */
import { Request, Response } from 'express';
import Analytics, { IAnalytics } from '../models/Analytics';

class AnalyticsController {
    /**
     * Method to create a new analytics model.
     * @param req Request object containing analytics model data.
     * @param res Response object to send the result.
     */
    public async createAnalytics(req: Request, res: Response): Promise<void> {
        try {
            const AnalyticsData: Partial<IAnalytics> = req.body;
            const newAnalytics = await Analytics.createAnalytics(AnalyticsData);
            res.status(201).json(newAnalytics);
        } catch (error) {
            console.error('Error creating analytics model:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    /**
     * Method to retrieve all analytics models.
     * @param req Request object.
     * @param res Response object to send the analytics models.
     */
    public async getAllAnalyticss(req: Request, res: Response): Promise<void> {
        try {
            const Analyticss = await Analytics.getAllAnalyticss();
            res.status(200).json(Analyticss);
        } catch (error) {
            console.error('Error fetching analytics models:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    /**
     * Method to retrieve an analytics model by its ID.
     * @param req Request object containing the analytics model ID.
     * @param res Response object to send the analytics model.
     */
    public async getAnalyticsById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const newAnalytics = await Analytics.findAnalyticsById(id);
            if (newAnalytics) {
                res.status(200).json(newAnalytics);
            } else {
                res.status(404).json({ error: 'Analytics model not found' });
            }
        } catch (error) {
            console.error('Error fetching analytics model by ID:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    /**
     * Method to update an analytics model by its ID.
     * @param req Request object containing the analytics model ID and updated data.
     * @param res Response object to send the updated analytics model.
     */
    public async updateAnalytics(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const updatedAnalyticsData = req.body;
            const updatedAnalytics = await Analytics.updateAnalytics(id, updatedAnalyticsData);
            if (updatedAnalytics) {
                res.status(200).json(updatedAnalytics);
            } else {
                res.status(404).json({ error: 'Analytics model not found' });
            }
        } catch (error) {
            console.error('Error updating analytics model:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    /**
     * Method to delete an analytics model by its ID.
     * @param req Request object containing the analytics model ID.
     * @param res Response object to send the result.
     */
    public async deleteAnalytics(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const deletedAnalytics = await Analytics.deleteAnalytics(id);
            if (deletedAnalytics) {
                res.status(200).json({ message: 'Analytics model deleted successfully' });
            } else {
                res.status(404).json({ error: 'Analytics model not found' });
            }
        } catch (error) {
            console.error('Error deleting analytics model:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default new AnalyticsController();
