// var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
//     function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
//     return new (P || (P = Promise))(function (resolve, reject) {
//         function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
//         function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
//         function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
//         step((generator = generator.apply(thisArg, _arguments || [])).next());
//     });
// };

import ExperienceModel from '../models/experience.js';

class ExperienceController {
    /**
     * Method to create a new experience entry.
     * @param req Request object containing experience data.
     * @param res Response object to send the result.
     */
    async createExperience(req, res) {
            try {
                const experienceData = req.body;
                const newExperience = await ExperienceModel.createExperience(experienceData);
                newExperience.save();
                res.status(201).json(newExperience);
            }
            catch (error) {
                console.error('Error creating experience:', error);
                res.status(500).send('Internal Server Error');
            }
    }
    /**
     * Method to retrieve all experience entries.
     * @param req Request object.
     * @param res Response object to send the experience entries.
     */
    async getAllExperiences(req, res) {
            try {
                const experienceEntries = await ExperienceModel.getAllExperience();
                res.status(200).json(experienceEntries);
            }
            catch (error) {
                console.error('Error fetching experience entries:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
    }
    /**
     * Method to retrieve an experience entry by its ID.
     * @param req Request object containing the experience entry ID.
     * @param res Response object to send the experience entry.
     */
    async getExperienceById(req, res) {
            try {
                const { id } = req.params;
                const experienceEntry = await ExperienceModel.findExperienceById(id);
                if (experienceEntry) {
                    res.status(200).json(experienceEntry);
                }
                else {
                    res.status(404).json({ error: 'Experience entry not found' });
                }
            }
            catch (error) {
                console.error('Error fetching experience entry by ID:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
    }
    /**
     * Method to update an experience entry by its ID.
     * @param req Request object containing the experience entry ID and updated data.
     * @param res Response object to send the updated experience entry.
     */
    async updateExperience(req, res) {
            try {
                const { id } = req.params;
                const updatedExperienceData = req.body;
                const updatedExperience = await ExperienceModel.updateExperience(id, updatedExperienceData);
                if (updatedExperience) {
                    updatedExperience.save();
                    res.status(200).json(updatedExperience);
                }
                else {
                    res.status(404).json({ error: 'Experience entry not found' });
                }
            }
            catch (error) {
                console.error('Error updating experience entry:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
    }
    /**
     * Method to delete an experience entry by its ID.
     * @param req Request object containing the experience entry ID.
     * @param res Response object to send the result.
     */
    async deleteExperience(req, res) {
            try {
                const { id } = req.params;
                const deletedExperience = await ExperienceModel.deleteExperience(id);
                if (deletedExperience) {
                    res.status(200).json({ message: 'Experience entry deleted successfully' });
                }
                else {
                    res.status(404).json({ error: 'Experience entry not found' });
                }
            }
            catch (error) {
                console.error('Error deleting experience entry:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
    }
}
export default ExperienceController;
