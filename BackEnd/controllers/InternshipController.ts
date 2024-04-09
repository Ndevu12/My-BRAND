/**
 * Controller for handling Internship-related operations.
 */
import { Request, Response } from 'express';
import InternshipModel, { IInternship } from '../models/Internship';

class InternshipController {
    /**
     * Method to create a new internship entry.
     * @param req Request object containing internship data.
     * @param res Response object to send the result.
     */
    public async createInternship(req: Request, res: Response): Promise<void> {
        try {
            const internshipData: Partial<IInternship> = req.body;
            const newInternship = await InternshipModel.createInternship(internshipData);
            res.status(201).json(newInternship);
        } catch (error) {
            console.error('Error creating internship:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    /**
     * Method to retrieve all internship entries.
     * @param req Request object.
     * @param res Response object to send the internship entries.
     */
    public async getAllInternships(req: Request, res: Response): Promise<void> {
        try {
            const internships = await InternshipModel.getAllInternships();
            res.status(200).json(internships);
        } catch (error) {
            console.error('Error fetching internship entries:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    /**
     * Method to retrieve an internship entry by its ID.
     * @param req Request object containing the internship entry ID.
     * @param res Response object to send the internship entry.
     */
    public async getInternshipById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const internship = await InternshipModel.findInternshipById(id);
            if (internship) {
                res.status(200).json(internship);
            } else {
                res.status(404).json({ error: 'Internship entry not found' });
            }
        } catch (error) {
            console.error('Error fetching internship entry by ID:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    /**
     * Method to update an internship entry by its ID.
     * @param req Request object containing the internship entry ID and updated data.
     * @param res Response object to send the updated internship entry.
     */
    public async updateInternship(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const updatedInternshipData = req.body;
            const updatedInternship = await InternshipModel.updateInternship(id, updatedInternshipData);
            if (updatedInternship) {
                res.status(200).json(updatedInternship);
            } else {
                res.status(404).json({ error: 'Internship entry not found' });
            }
        } catch (error) {
            console.error('Error updating internship entry:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    /**
     * Method to delete an internship entry by its ID.
     * @param req Request object containing the internship entry ID.
     * @param res Response object to send the result.
     */
    public async deleteInternship(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const deletedInternship = await InternshipModel.deleteInternship(id);
            if (deletedInternship) {
                res.status(200).json({ message: 'Internship entry deleted successfully' });
            } else {
                res.status(404).json({ error: 'Internship entry not found' });
            }
        } catch (error) {
            console.error('Error deleting internship entry:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default new InternshipController();
