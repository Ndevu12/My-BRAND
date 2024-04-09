/**
 * This file deals with storing and handling Internship information.
 */
import { Schema as _Schema, model as _model } from "mongoose";
const Schema = _Schema;

/**
 * Class representing the Internship model.
 */
class InternshipModel {
    constructor() {
        const InternshipSchema = new Schema({
            title: {
                type: String,
                required: true,
            },
            content: {
                type: String,
                required: true,
            },
            company: {
                type: String,
                required: true,
            },
            duration: {
                type: String,
                required: true,
            },
            compilationDate: {
                type: Date,
                required: true,
            },
            certificate: {
                LicenseAndCertificate
            },
        });


        this.model = _model('Internship', InternshipSchema);
    }
    /**
   * Method to create a new Internship document.
   * @param data Partial Internship data to create.
   * @returns Promise resolving to the created Internship document.
   */
    async createInternship(data) {
        return await this.model.create(data);
    }
    /**
     * Method to find an Internship document by ID.
     * @param id Internship ID.
     * @returns Promise resolving to the found Internship document, or null if not found.
     */
    async findInternshipById(id) {
        return await this.model.findById(id).exec();
    }
    /**
    * Method to update an Internship document.
    * @param id Internship ID to update.
    * @param data Partial Internship data to update.
    * @returns Promise resolving to the updated Internship document, or null if not found.
    */
    async updateInternship(id, data) {
        return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    /**
   * Method to delete an Internship document.
   * @param id Internship ID to delete.
   * @returns Promise resolving to the deleted Internship document, or null if not found.
   */
    async deleteInternship(id) {
        return await this.model.findByIdAndDelete(id).exec();
    }
    async getAllInternships() {
        return await this.model.find().exec();
    }
}
// hijokl
export default InternshipModel;
