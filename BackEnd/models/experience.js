/**
 * This file deals with storing and handling experiences.
 */
import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;
/**
 * Class representing the Experience model.
 */
class ExperienceModel {
    constructor() {
        const experienceSchema = new Schema({
            title: {
                type: String,
                required: true,
            },
            content: {
                type: String,
                required: true,
            },
            companyWorkedAt: {
                type: String,
                required: true,
            },
            duration: {
                type: String,
                required: true,
            },
            certificateImage: {
                type: String,
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
            updatedAt: {
                type: Date,
                default: Date.now,
            },
        });


        this.model = model('Experience', experienceSchema);
    }
    /**
     * Method to create a new experience document.
     * @param data - The data for the new experience.
     * @returns A promise that resolves with the created experience.
     */
    async createExperience(data) {
        return await this.model.create(data);
    }
    /**
     * Method to find an experience document by ID.
     * @param id - The ID of the experience to find.
     * @returns A promise that resolves with the found experience, or null if not found.
     */
    async findExperienceById(id) {
        return await this.model.findById(id).exec();
    }
    /**
     * Method to update an experience document.
     * @param id - The ID of the experience to update.
     * @param data - The updated data for the experience.
     * @returns A promise that resolves with the updated experience, or null if not found.
     */
    async updateExperience(id, data) {
        return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    /**
     * Method to delete an experience document.
     * @param id - The ID of the experience to delete.
     * @returns A promise that resolves with the deleted experience, or null if not found.
     */
    async deleteExperience(id) {
        return await this.model.findByIdAndDelete(id).exec();
    }
    async getAllExperience() {
        return await this.model.find().exec();
    }
}
export default ExperienceModel;
