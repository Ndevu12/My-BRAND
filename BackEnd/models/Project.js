/**
 * This file deals with storing and handling Project information.
 */
import mongoose from "mongoose";
const Schema = mongoose.Schema;

/**
 * Class representing the Project model.
 */
class ProjectModel {
    constructor() {
        const projectSchema = new Schema({
            intro: {
                type: String,
                required: true,
            },
            image: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            moreDescription: {
                type: String,
                required: true,
            },
            reference: {
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

        this.model = mongoose.model('Project', projectSchema);
    }
    /**
     * Method to create a new Project document.
     * @param data Partial Project data to create.
     * @returns Promise resolving to the created Project document.
     */
    async createProject(data) {
        return await this.model.create(data);
    }
    /**
     * Method to find a Project document by ID.
     * @param id Project ID.
     * @returns Promise resolving to the found Project document, or null if not found.
     */
    async findProjectById(id) {
        return await this.model.findById(id).exec();
    }
    /**
     * Method to update a Project document.
     * @param id Project ID to update.
     * @param data Partial Project data to update.
     * @returns Promise resolving to the updated Project document, or null if not found.
     */
    async updateProject(id, data) {
        return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    /**
     * Method to delete a Project document.
     * @param id Project ID to delete.
     * @returns Promise resolving to the deleted Project document, or null if not found.
     */
    async deleteProject(id) {
        return await this.model.findByIdAndDelete(id).exec();
    }
    async getAllProjects() {
        return await this.model.find().exec();
    }
}
export default ProjectModel;
