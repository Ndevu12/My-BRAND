/**
 * Controller for handling Author-related operations.
 */
import { Request, Response } from 'express';
import AuthorModel, { IAuthor } from '../models/author';

class AuthorController {
    /**
     * Method to create a new author.
     * @param req Request object containing author data.
     * @param res Response object to send the result.
     */
    public async createAuthor(req: Request, res: Response): Promise<void> {
        try {
            const authorData: Partial<IAuthor> = req.body;
            const newAuthor = await AuthorModel.createAuthor(authorData);
            res.status(201).json(newAuthor);
        } catch (error) {
            console.error('Error creating author:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    /**
     * Method to retrieve all authors.
     * @param req Request object.
     * @param res Response object to send the authors.
     */
    public async getAllAuthors(req: Request, res: Response): Promise<void> {
        try {
            const authors = await AuthorModel.getAllAuthors();
            res.status(200).json(authors);
        } catch (error) {
            console.error('Error fetching authors:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    /**
     * Method to retrieve an author by their ID.
     * @param req Request object containing the author ID.
     * @param res Response object to send the author.
     */
    public async getAuthorById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const author = await AuthorModel.findAuthorById(id);
            if (author) {
                res.status(200).json(author);
            } else {
                res.status(404).json({ error: 'Author not found' });
            }
        } catch (error) {
            console.error('Error fetching author by ID:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    /**
     * Method to update an author by their ID.
     * @param req Request object containing the author ID and updated data.
     * @param res Response object to send the updated author.
     */
    public async updateAuthor(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const updatedAuthorData = req.body;
            const updatedAuthor = await AuthorModel.updateAuthor(id, updatedAuthorData);
            if (updatedAuthor) {
                res.status(200).json(updatedAuthor);
            } else {
                res.status(404).json({ error: 'Author not found' });
            }
        } catch (error) {
            console.error('Error updating author:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    /**
     * Method to delete an author by their ID.
     * @param req Request object containing the author ID.
     * @param res Response object to send the result.
     */
    public async deleteAuthor(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const deletedAuthor = await AuthorModel.deleteAuthor(id);
            if (deletedAuthor) {
                res.status(200).json({ message: 'Author deleted successfully' });
            } else {
                res.status(404).json({ error: 'Author not found' });
            }
        } catch (error) {
            console.error('Error deleting author:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default new AuthorController();
