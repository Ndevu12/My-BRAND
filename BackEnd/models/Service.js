/**
 * This file deals with storing and handling Service information.
 */
import { Schema as _Schema, model as _model } from "mongoose";
const Schema = _Schema;

/**
 * Class representing the Service model.
 */
class ServiceModel {
    constructor() {
        const serviceSchema = new Schema({
            title: {
                type: String,
                required: true,
            },
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
            moreContent: {
                type: String,
                required: true,
            },
            projectSample: {
                type: Schema.ObjectId,
                ref: "Project", 
                required: true
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

        this.model = _model('Service', serviceSchema);
    }
    /**
     * Method to create a new Service document.
     * @param data Partial Service data to create.
     * @returns Promise resolving to the created Service document.
     */
    async createService(data) {
        return await this.model.create(data);
    }
    /**
     * Method to find a Service document by ID.
     * @param id Service ID.
     * @returns Promise resolving to the found Service document, or null if not found.
     */
    async findServiceById(id) {
        return await this.model.findById(id).exec();
    }
    /**
     * Method to update a Service document.
     * @param id Service ID to update.
     * @param data Partial Service data to update.
     * @returns Promise resolving to the updated Service document, or null if not found.
     */
    async updateService(id, data) {
        return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    /**
     * Method to delete a Service document.
     * @param id Service ID to delete.
     * @returns Promise resolving to the deleted Service document, or null if not found.
     */
    async deleteService(id) {
        return await this.model.findByIdAndDelete(id).exec();
    }
    async getAllServices() {
        return await this.model.find().exec();
    }
}
export default ServiceModel;
