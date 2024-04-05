// var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
//     function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
//     return new (P || (P = Promise))(function (resolve, reject) {
//         function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
//         function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
//         function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
//         step((generator = generator.apply(thisArg, _arguments || [])).next());
//     });
// };

import AuthorModel from '../models/author.js';

class AuthorController {
    /**
     * Method to create a new author.
     * @param req Request object containing author data.
     * @param res Response object to send the result.
     */
    async createAuthor(req, res) {
            try {
                const authorData = req.body;
                const newAuthor = await AuthorModel.createAuthor(authorData);
                res.status(201).json(newAuthor);
            }
            catch (error) {
                console.error('Error creating author:', error);
                res.status(500).send('Internal Server Error');
            }
    }
    /**
     * Method to retrieve all authors.
     * @param req Request object.
     * @param res Response object to send the authors.
     */
    async getAllAuthors(req, res) {
            try {
                const authors = await AuthorModel.getAllAuthors();
                res.status(200).json(authors);
            }
            catch (error) {
                console.error('Error fetching authors:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
    }
    /**
     * Method to retrieve an author by their ID.
     * @param req Request object containing the author ID.
     * @param res Response object to send the author.
     */
    async getAuthorById(req, res) {
            try {
                const { id } = req.params;
                const author = await AuthorModel.findAuthorById(id);
                if (author) {
                    res.status(200).json(author);
                }
                else {
                    res.status(404).json({ error: 'Author not found' });
                }
            }
            catch (error) {
                console.error('Error fetching author by ID:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
    }
    /**
     * Method to update an author by their ID.
     * @param req Request object containing the author ID and updated data.
     * @param res Response object to send the updated author.
     */
    async updateAuthor(req, res) {
            try {
                const { id } = req.params;
                const updatedAuthorData = req.body;
                const updatedAuthor = await AuthorModel.updateAuthor(id, updatedAuthorData);
                if (updatedAuthor) {
                    updatedAuthor.save();
                    res.status(200).json(updatedAuthor);
                }
                else {
                    res.status(404).json({ error: 'Author not found' });
                }
            }
            catch (error) {
                console.error('Error updating author:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
    }
    /**
     * Method to delete an author by their ID.
     * @param req Request object containing the author ID.
     * @param res Response object to send the result.
     */
    async deleteAuthor(req, res) {
            try {
                const { id } = req.params;
                const deletedAuthor = await AuthorModel.deleteAuthor(id);
                if (deletedAuthor) {
                    res.status(200).json({ message: 'Author deleted successfully' });
                }
                else {
                    res.status(404).json({ error: 'Author not found' });
                }
            }
            catch (error) {
                console.error('Error deleting author:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
    }
}

export default AuthorController;
