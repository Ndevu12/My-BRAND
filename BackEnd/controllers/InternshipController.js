// var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
//     function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
//     return new (P || (P = Promise))(function (resolve, reject) {
//         function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
//         function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
//         function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
//         step((generator = generator.apply(thisArg, _arguments || [])).next());
//     });
// };

import InternshipModel from '../models/Internship.js';

class InternshipController {
    /**
     * Method to create a new internship entry.
     * @param req Request object containing internship data.
     * @param res Response object to send the result.
     */
    async createInternship(req, res) {
            try {
                const internshipData = req.body;
                const newInternship = await InternshipModel.createInternship(internshipData);
                newInternship.save();
                res.status(201).json(newInternship);
            }
            catch (error) {
                console.error('Error creating internship:', error);
                res.status(500).send('Internal Server Error');
            }
    }
    /**
     * Method to retrieve all internship entries.
     * @param req Request object.
     * @param res Response object to send the internship entries.
     */
    async getAllInternships(req, res) {
            try {
                const internships = await InternshipModel.getAllInternships();
                res.status(200).json(internships);
            }
            catch (error) {
                console.error('Error fetching internship entries:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
    }
    /**
     * Method to retrieve an internship entry by its ID.
     * @param req Request object containing the internship entry ID.
     * @param res Response object to send the internship entry.
     */
    async getInternshipById(req, res) {
            try {
                const { id } = req.params;
                const internship = await InternshipModel.findInternshipById(id);
                if (internship) {
                    res.status(200).json(internship);
                }
                else {
                    res.status(404).json({ error: 'Internship entry not found' });
                }
            }
            catch (error) {
                console.error('Error fetching internship entry by ID:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
    }
    /**
     * Method to update an internship entry by its ID.
     * @param req Request object containing the internship entry ID and updated data.
     * @param res Response object to send the updated internship entry.
     */
    async updateInternship(req, res) {
            try {
                const { id } = req.params;
                const updatedInternshipData = req.body;
                const updatedInternship = await InternshipModel.updateInternship(id, updatedInternshipData);
                
                if (updatedInternship) {
                    updatedInternship.save();
                    res.status(200).json(updatedInternship);
                }
                else {
                    res.status(404).json({ error: 'Internship entry not found' });
                }
            }
            catch (error) {
                console.error('Error updating internship entry:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
    }
    /**
     * Method to delete an internship entry by its ID.
     * @param req Request object containing the internship entry ID.
     * @param res Response object to send the result.
     */
    async deleteInternship(req, res) {
            try {
                const { id } = req.params;
                const deletedInternship = await InternshipModel.deleteInternship(id);
                if (deletedInternship) {
                    res.status(200).json({ message: 'Internship entry deleted successfully' });
                }
                else {
                    res.status(404).json({ error: 'Internship entry not found' });
                }
            }
            catch (error) {
                console.error('Error deleting internship entry:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
    }
}
export default InternshipController;
