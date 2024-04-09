/**
 * This file deals with storing and handling Education information.
 */
import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;
/**
 * Class representing the education model.
 */
class EducationModel {
    constructor() {
        const educationSchema = new Schema({
            title: {
                type: String,
                required: true,
            },
            school: {
                type: String,
                required: true,
            },
            startDate: {
                type: Date,
                required: true,
            },
            compilationDate: {
                type: Date,
                required: true,
            },
            certificate: {
                type: Schema.ObjectId,
                ref: "LicenseAndCertificate", 
                required: true
            },
        });


        this.model = model('Education', educationSchema);
    }
    /**
     * Method to create a new Education document.
     * @param data Partial Education data to create.
     * @returns Promise resolving to the created Education document.
     */
    async createEducation(data) {
        return await this.model.create(data);
    }
    /**
     * Method to find an Education document by ID.
     * @param id Education ID.
     * @returns Promise resolving to the found Education document, or null if not found.
     */
    async getEducationById(id) {
        return await this.model.findById(id).exec();
    }
    /**
     * Method to update an Education document.
     * @param id Education ID to update.
     * @param data Partial Education data to update.
     * @returns Promise resolving to the updated Education document, or null if not found.
     */
    async updateEducation(id, data) {
        return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    /**
     * Method to delete an Education document.
     * @param id Education ID to delete.
     * @returns Promise resolving to the deleted Education document, or null if not found.
     */
    async deleteEducation(id) {
        return await this.model.findByIdAndDelete(id).exec();
    }
    async getAllEducation() {
        return await this.model.find().exec();
    }
}
// hijokl
export default EducationModel;
