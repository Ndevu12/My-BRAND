/**
 * Controller for handling Space Status-related operations.
 */
import { Request, Response } from 'express';
import SpaceStatusModel, { ISpaceStatus } from '../models/spaceStatus';

class SpaceStatusController {
    /**
     * Method to create a new space status.
     * @param req Request object containing space status data.
     * @param res Response object to send the result.
     */
    public async createSpaceStatus(req: Request, res: Response): Promise<void> {
        try {
            const spaceStatusData: Partial<ISpaceStatus> = req.body;
            const newSpaceStatus = await SpaceStatusModel.createSpaceStatus(spaceStatusData);
            res.status(201).json(newSpaceStatus);
        } catch (error) {
            console.error('Error creating space status:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    /**
     * Method to retrieve all space statuses.
     * @param req Request object.
     * @param res Response object to send the space statuses.
     */
    public async getAllSpaceStatuses(req: Request, res: Response): Promise<void> {
        try {
            const spaceStatuses = await SpaceStatusModel.getAllSpaceStatuses();
            res.status(200).json(spaceStatuses);
        } catch (error) {
            console.error('Error fetching space statuses:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    /**
     * Method to retrieve a space status by its ID.
     * @param req Request object containing the space status ID.
     * @param res Response object to send the space status.
     */
    public async getSpaceStatusById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const spaceStatus = await SpaceStatusModel.findSpaceStatusById(id);
            if (spaceStatus) {
                res.status(200).json(spaceStatus);
            } else {
                res.status(404).json({ error: 'Space status not found' });
            }
        } catch (error) {
            console.error('Error fetching space status by ID:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    /**
     * Method to update a space status by its ID.
     * @param req Request object containing the space status ID and updated data.
     * @param res Response object to send the updated space status.
     */
    public async updateSpaceStatus(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const updatedSpaceStatusData = req.body;
            const updatedSpaceStatus = await SpaceStatusModel.updateSpaceStatus(id, updatedSpaceStatusData);
            if (updatedSpaceStatus) {
                res.status(200).json(updatedSpaceStatus);
            } else {
                res.status(404).json({ error: 'Space status not found' });
            }
        } catch (error) {
            console.error('Error updating space status:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    /**
     * Method to delete a space status by its ID.
     * @param req Request object containing the space status ID.
     * @param res Response object to send the result.
     */
    public async deleteSpaceStatus(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const deletedSpaceStatus = await SpaceStatusModel.deleteSpaceStatus(id);
            if (deletedSpaceStatus) {
                res.status(200).json({ message: 'Space status deleted successfully' });
            } else {
                res.status(404).json({ error: 'Space status not found' });
            }
        } catch (error) {
            console.error('Error deleting space status:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default new SpaceStatusController();
