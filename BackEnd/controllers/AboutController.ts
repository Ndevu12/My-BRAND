/**
 * Controller for handling About-related operations.
 */
import { Request, Response } from 'express';
import AboutModel, { IAbout } from '../models/About';

class AboutController {
    /**
     * Method to create a new about section.
     * @param req Request object containing about data.
     * @param res Response object to send the result.
     */
    public async createAbout(req: Request, res: Response): Promise<void> {
        try {
            const aboutData: Partial<IAbout> = req.body;
            const newAbout = await AboutModel.createAbout(aboutData);
            res.status(201).json(newAbout);
        } catch (error) {
            console.error('Error creating about section:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    /**
     * Method to retrieve all about sections.
     * @param req Request object.
     * @param res Response object to send the about sections.
     */
    public async getAllAbout(req: Request, res: Response): Promise<void> {
        try {
            const aboutSections = await AboutModel.getAllAbout();
            res.status(200).json(aboutSections);
        } catch (error) {
            console.error('Error fetching about sections:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    /**
     * Method to retrieve an about section by its ID.
     * @param req Request object containing the about section ID.
     * @param res Response object to send the about section.
     */
    public async getAboutById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const aboutSection = await AboutModel.findAboutById(id);
            if (aboutSection) {
                res.status(200).json(aboutSection);
            } else {
                res.status(404).json({ error: 'About section not found' });
            }
        } catch (error) {
            console.error('Error fetching about section by ID:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    /**
     * Method to update an about section by its ID.
     * @param req Request object containing the about section ID and updated data.
     * @param res Response object to send the updated about section.
     */
    public async updateAbout(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const updatedAboutData = req.body;
            const updatedAboutSection = await AboutModel.updateAbout(id, updatedAboutData);
            if (updatedAboutSection) {
                res.status(200).json(updatedAboutSection);
            } else {
                res.status(404).json({ error: 'About section not found' });
            }
        } catch (error) {
            console.error('Error updating about section:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    /**
     * Method to delete an about section by its ID.
     * @param req Request object containing the about section ID.
     * @param res Response object to send the result.
     */
    public async deleteAbout(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const deletedAboutSection = await AboutModel.deleteAbout(id);
            if (deletedAboutSection) {
                res.status(200).json({ message: 'About section deleted successfully' });
            } else {
                res.status(404).json({ error: 'About section not found' });
            }
        } catch (error) {
            console.error('Error deleting about section:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default new AboutController();
