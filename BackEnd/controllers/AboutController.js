// var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
//     function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
//     return new (P || (P = Promise))(function (resolve, reject) {
//         function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
//         function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
//         function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
//         step((generator = generator.apply(thisArg, _arguments || [])).next());
//     });
// };

import  AboutModel from'../models/About.js';

class AboutController {

    // constructor() {
    //     this.aboutModel = new AboutModel();
    //   }
    /**
     * Method to create a new about section.
     * @param req Request object containing about data.
     * @param res Response object to send the result.
     */
    async createAbouting(req, res) {
            try {
                const aboutData = req.body;
                const newAbout = await AboutModel.createAbout(aboutData);
                res.status(201).json(newAbout);
            }
            catch (error) {
                console.error('Error creating about section:', error);
                res.status(500).send('Internal Server Error');
            }
        }
    
    /**
     * Method to retrieve all about sections.
     * @param req Request object.
     * @param res Response object to send the about sections.
     */

    async getAllAbout(req, res) {
            try {
                const aboutSections = await AboutModel.getAllAbout();
                res.status(200).json(aboutSections);
            }
            catch (error) {
                console.error('Error fetching about sections:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    
    /**
     * Method to retrieve an about section by its ID.
     * @param req Request object containing the about section ID.
     * @param res Response object to send the about section.
     */
    async getAboutById(req, res) {
            try {
                const { id } = req.params;
                const aboutSection = await AboutModel.findAboutById(id);
                if (aboutSection) {
                    res.status(200).json(aboutSection);
                }
                else {
                    res.status(404).json({ error: 'About section not found' });
                }
            }
            catch (error) {
                console.error('Error fetching about section by ID:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    /**
     * Method to update an about section by its ID.
     * @param req Request object containing the about section ID and updated data.
     * @param res Response object to send the updated about section.
     */
    async updateAbout(req, res) {
            try {
                const { id } = req.params;
                const updatedAboutData = req.body;
                const updatedAboutSection = await AboutModel.updateAbout(id, updatedAboutData);
                if (updatedAboutSection) {
                    res.status(200).json(updatedAboutSection);
                }
                else {
                    res.status(404).json({ error: 'About section not found' });
                }
            }
            catch (error) {
                console.error('Error updating about section:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
    }
    /**
     * Method to delete an about section by its ID.
     * @param req Request object containing the about section ID.
     * @param res Response object to send the result.
     */
    async deleteAbout(req, res) {
            try {
                const { id } = req.params;
                const deletedAboutSection = await AboutModel.deleteAbout(id);
                if (deletedAboutSection) {
                    res.status(200).json({ message: 'About section deleted successfully' });
                }
                else {
                    res.status(404).json({ error: 'About section not found' });
                }
            }
            catch (error) {
                console.error('Error deleting about section:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
    }
}
export default AboutController;
