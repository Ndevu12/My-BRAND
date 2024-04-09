// var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
//     function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
//     return new (P || (P = Promise))(function (resolve, reject) {
//         function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
//         function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
//         function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
//         step((generator = generator.apply(thisArg, _arguments || [])).next());
//     });
// };

import EducationModel from '../models/Education.js';

class EducationController {
    /**
     * Method to fetch all education records.
     * @param req Request object.
     * @param res Response object to send the education records.
     */
    async getAllEducations(req, res) {
            try {
                const educationRecords = await EducationModel.getAllEducation();
                res.status(200).json(educationRecords);
            }
            catch (error) {
                console.error('Error fetching education records:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
    }
    // hijokl
    /**
     * Method to fetch education record by ID.
     * @param req Request object containing the education record ID.
     * @param res Response object to send the education record.
     */
    async getEducationById(req, res) {
            try {
                const { id } = req.params;
                const educationRecord = await EducationModel.getEducationById(id);
                if (educationRecord) {
                    res.status(200).json(educationRecord);
                }
                else {
                    res.status(404).json({ error: 'Education record not found' });
                }
            }
            catch (error) {
                console.error('Error fetching education record by ID:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
    }
    /**
     * Method to create a new education record.
     * @param req Request object containing the education record data.
     * @param res Response object to send the result.
     */
    async createEducation(req, res) {
            try {
                const educationData = req.body;
                const newEducation = await EducationModel.createEducation(educationData);
                newEducation.save();
                res.status(201).json(newEducation);
            }
            catch (error) {
                console.error('Error creating education record:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
    }
    /**
     * Method to update an education record by ID.
     * @param req Request object containing the education record ID and updated data.
     * @param res Response object to send the updated education record.
     */
    async updateEducation(req, res) {
            try {
                const { id } = req.params;
                const updatedEducationData = req.body;
                const updatedEducation = await EducationModel.updateEducation(id, updatedEducationData);
                
                if (updatedEducation) {
                    updatedEducation.save();
                    res.status(200).json(updatedEducation);
                }
                else {
                    res.status(404).json({ error: 'Education record not found' });
                }
            }
            catch (error) {
                console.error('Error updating education record:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
    }
    /**
     * Method to delete an education record by ID.
     * @param req Request object containing the education record ID.
     * @param res Response object to send the result.
     */
    async deleteEducation(req, res) {
            try {
                const { id } = req.params;
                const deletedEducation = await EducationModel.deleteEducation(id);
                if (deletedEducation) {
                    res.status(200).json({ message: 'Education record deleted successfully' });
                }
                else {
                    res.status(404).json({ error: 'Education record not found' });
                }
            }
            catch (error) {
                console.error('Error deleting education record:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
    }
}
export default EducationController;
