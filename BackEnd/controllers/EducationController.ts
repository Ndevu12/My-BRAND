import { Request, Response } from 'express';
import EducationModel, { IEducation } from '../models/Education';

class EducationController {
    /**
     * Method to fetch all education records.
     * @param req Request object.
     * @param res Response object to send the education records.
     */
    public async getAllEducations(req: Request, res: Response): Promise<void> {
        try {
            const educationRecords = await EducationModel.getAllEducation();
            res.status(200).json(educationRecords);
        } catch (error) {
            console.error('Error fetching education records:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    /**
     * Method to fetch education record by ID.
     * @param req Request object containing the education record ID.
     * @param res Response object to send the education record.
     */
    public async getEducationById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const educationRecord = await EducationModel.getEducationById(id);
            if (educationRecord) {
                res.status(200).json(educationRecord);
            } else {
                res.status(404).json({ error: 'Education record not found' });
            }
        } catch (error) {
            console.error('Error fetching education record by ID:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    /**
     * Method to create a new education record.
     * @param req Request object containing the education record data.
     * @param res Response object to send the result.
     */
    public async createEducation(req: Request, res: Response): Promise<void> {
        try {
            const educationData: Partial<IEducation> = req.body;
            const newEducation = await EducationModel.createEducation(educationData);
            res.status(201).json(newEducation);
        } catch (error) {
            console.error('Error creating education record:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    /**
     * Method to update an education record by ID.
     * @param req Request object containing the education record ID and updated data.
     * @param res Response object to send the updated education record.
     */
    public async updateEducation(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const updatedEducationData = req.body;
            const updatedEducation = await EducationModel.updateEducation(id, updatedEducationData);
            if (updatedEducation) {
                res.status(200).json(updatedEducation);
            } else {
                res.status(404).json({ error: 'Education record not found' });
            }
        } catch (error) {
            console.error('Error updating education record:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    /**
     * Method to delete an education record by ID.
     * @param req Request object containing the education record ID.
     * @param res Response object to send the result.
     */
    public async deleteEducation(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const deletedEducation = await EducationModel.deleteEducation(id);
            if (deletedEducation) {
                res.status(200).json({ message: 'Education record deleted successfully' });
            } else {
                res.status(404).json({ error: 'Education record not found' });
            }
        } catch (error) {
            console.error('Error deleting education record:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export default new EducationController();
