// var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
//     function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
//     return new (P || (P = Promise))(function (resolve, reject) {
//         function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
//         function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
//         function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
//         step((generator = generator.apply(thisArg, _arguments || [])).next());
//     });
// };

import SkillModel from '../models/Skill.js';

class SkillController {
    /**
     * Method to create a new skill.
     * @param req Request object containing skill data.
     * @param res Response object to send the result.
     */
    async createSkill(req, res) {
            try {
                const SkillData = req.body;
                const newSkill = await SkillModel.createSkill(SkillData);
                res.status(201).json(newSkill);
            }
            catch (error) {
                console.error('Error creating Skill:', error);
                res.status(500).send('Internal Server Error');
            }
    }
    /**
     * Method to retrieve all skills.
     * @param req Request object.
     * @param res Response object to send the skills.
     */
    async getAllSkills(req, res) {
            try {
                // Call the getAllSkills method from SkillModel to fetch all skills
                const skills = await SkillModel.getAllSkills();
                // Return the skills in the response
                res.status(200).json(skills);
            }
            catch (error) {
                // Handle errors
                console.error('Error fetching skills:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
    }
    /**
     * Method to retrieve a skill by its ID.
     * @param req Request object containing the skill ID.
     * @param res Response object to send the skill.
     */
    async getSkillById(req, res) {
            try {
                // Extract skill ID from request parameters
                const { id } = req.params;
                // Call the getSkillById method from SkillModel to fetch the skill
                const skill = await SkillModel.findSkillById(id);
                // Return the skill in the response
                if (skill) {
                    res.status(200).json(skill);
                }
                else {
                    res.status(404).json({ error: 'Skill not found' });
                }
            }
            catch (error) {
                // Handle errors
                console.error('Error fetching skill by ID:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
    }
    /**
     * Method to update a skill by its ID.
     * @param req Request object containing the skill ID and updated data.
     * @param res Response object to send the updated skill.
     */
    async updateSkill(req, res) {
            try {
                // Extract skill ID and updated data from request body
                const { id } = req.params;
                const updatedSkillData = req.body;
                // Call the updateSkill method from SkillModel to update the skill
                const updatedSkill = await SkillModel.updateSkill(id, updatedSkillData);
                // Return the updated skill in the response
                if (updatedSkill) {
                    res.status(200).json(updatedSkill);
                }
                else {
                    res.status(404).json({ error: 'Skill not found' });
                }
            }
            catch (error) {
                // Handle errors
                console.error('Error updating skill:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
    }
    /**
     * Method to delete a skill by its ID.
     * @param req Request object containing the skill ID.
     * @param res Response object to send the result.
     */
    async deleteSkill(req, res) {
            try {
                // Extract skill ID from request parameters
                const { id } = req.params;
                // Call the deleteSkill method from SkillModel to delete the skill
                const deletedSkill = await SkillModel.deleteSkill(id);
                // Return success message in the response
                if (deletedSkill) {
                    res.status(200).json({ message: 'Skill deleted successfully' });
                }
                else {
                    res.status(404).json({ error: 'Skill not found' });
                }
            }
            catch (error) {
                // Handle errors
                console.error('Error deleting skill:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
    }
}
// hijokl
export default SkillController;
