// var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
//     function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
//     return new (P || (P = Promise))(function (resolve, reject) {
//         function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
//         function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
//         function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
//         step((generator = generator.apply(thisArg, _arguments || [])).next());
//     });
// };

import SpaceStatusModel from '../models/spaceStatus.js';

class SpaceStatusController {
    /**
     * Method to create a new space status.
     * @param req Request object containing space status data.
     * @param res Response object to send the result.
     */
    async createSpaceStatus(req, res) {
            try {
                const spaceStatusData = req.body;
                const newSpaceStatus = await SpaceStatusModel.createSpaceStatus(spaceStatusData);
                res.status(201).json(newSpaceStatus);
            }
            catch (error) {
                console.error('Error creating space status:', error);
                res.status(500).send('Internal Server Error');
            }
    }
    /**
     * Method to retrieve all space statuses.
     * @param req Request object.
     * @param res Response object to send the space statuses.
     */
    async getAllSpaceStatuses(req, res) {
            try {
                const spaceStatuses = await SpaceStatusModel.getAllSpaceStatuses();
                res.status(200).json(spaceStatuses);
            }
            catch (error) {
                console.error('Error fetching space statuses:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
    }
    /**
     * Method to retrieve a space status by its ID.
     * @param req Request object containing the space status ID.
     * @param res Response object to send the space status.
     */
    async getSpaceStatusById(req, res) {
            try {
                const { id } = req.params;
                const spaceStatus = await SpaceStatusModel.findSpaceStatusById(id);
                if (spaceStatus) {
                    res.status(200).json(spaceStatus);
                }
                else {
                    res.status(404).json({ error: 'Space status not found' });
                }
            }
            catch (error) {
                console.error('Error fetching space status by ID:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
    }
    /**
     * Method to update a space status by its ID.
     * @param req Request object containing the space status ID and updated data.
     * @param res Response object to send the updated space status.
     */
    async updateSpaceStatus(req, res) {
            try {
                const { id } = req.params;
                const updatedSpaceStatusData = req.body;
                const updatedSpaceStatus = await SpaceStatusModel.updateSpaceStatus(id, updatedSpaceStatusData);
                if (updatedSpaceStatus) {
                    res.status(200).json(updatedSpaceStatus);
                }
                else {
                    res.status(404).json({ error: 'Space status not found' });
                }
            }
            catch (error) {
                console.error('Error updating space status:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
    }
    /**
     * Method to delete a space status by its ID.
     * @param req Request object containing the space status ID.
     * @param res Response object to send the result.
     */
    async deleteSpaceStatus(req, res) {
            try {
                const { id } = req.params;
                const deletedSpaceStatus = await SpaceStatusModel.deleteSpaceStatus(id);
                if (deletedSpaceStatus) {
                    res.status(200).json({ message: 'Space status deleted successfully' });
                }
                else {
                    res.status(404).json({ error: 'Space status not found' });
                }
            }
            catch (error) {
                console.error('Error deleting space status:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
    }
}
export default SpaceStatusController;
