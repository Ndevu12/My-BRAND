/**
 * This file deals with storing and handling skills.
 */
import { Schema as _Schema, model as _model } from "mongoose";
const Schema = _Schema;

/**
 * Class representing the Skill model.
 */
class SkillModel {
    constructor() {
        const skillSchema = new Schema({
            title: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            image: {
                type: String,
                required: true,
            },
            certificate: {
                type: Schema.ObjectId,
                ref: "Certificate", 
                required: true
            },
            compilationDate: {
                type: Date,
                default: Date.now,
            },
        });

                // Virtual for this skill instance URL.
        skillSchema.virtual("url").get(function () {
            return "/About/skill/" + this._id;
            });
        this.model = _model('Skill', skillSchema);
    }
    /**
     * Method to create a new skill document.
     * @param data Partial skill data to create.
     * @returns Promise resolving to the created skill document.
     */
    async createSkill(data) {
        return await this.model.create(data);
    }
    /**
     * Method to find a skill document by ID.
     * @param id Skill ID.
     * @returns Promise resolving to the found skill document, or null if not found.
     */
    async findSkillById(id) {
        return await this.model.findById(id).exec();
    }
    /**
     * Method to update a skill document.
     * @param id Skill ID to update.
     * @param data Partial skill data to update.
     * @returns Promise resolving to the updated skill document, or null if not found.
     */
    async updateSkill(id, data) {
        return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    /**
     * Method to delete a skill document.
     * @param id Skill ID to delete.
     * @returns Promise resolving to the deleted skill document, or null if not found.
     */
    async deleteSkill(id) {
        return await this.model.findByIdAndDelete(id).exec();
    }
    async getAllSkills() {
        return await this.model.find().exec();
    }
}
export default SkillModel;
