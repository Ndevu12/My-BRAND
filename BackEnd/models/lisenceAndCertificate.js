/**
 * This file deals with storing and handling License and Certificate information.
 */
import { Schema as _Schema, model as _model } from "mongoose";
const Schema = _Schema;

/**
 * Class representing the LicenseAndCertificate model.
 */
class LicenseAndCertificateModel {
    constructor() {
        const LicenseAndCertificateSchema = new Schema({
            Course: {
                type: Schema.ObjectId,
                ref: "Education", 
                required: true
            },
            content: {
                type: String,
                required: true,
            },
            school: {
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
                type: Schema.ObjectId,
                ref: "Certificate", 
                required: true
            },
        });

        // Virtual for this about instance URL.
        LicenseAndCertificateSchema.virtual("url").get(function () {
            return "/About/licenseAndCertificate/" + this._id;
            });
        this.model = _model('LicenseAndCertificate', LicenseAndCertificateSchema);
    }
    /**
    * Method to create a new LicenseAndCertificate document.
    * @param data Partial LicenseAndCertificate data to create.
    * @returns Promise resolving to the created LicenseAndCertificate document.
    */
    async createLicenseAndCertificate(data) {
        return await this.model.create(data);
    }
    /**
     * Method to find an LicenseAndCertificate document by ID.
     * @param id LicenseAndCertificate ID.
     * @returns Promise resolving to the found LicenseAndCertificate document, or null if not found.
     */
    async findLicenseAndCertificate(id) {
        return await this.model.findById(id).exec();
    }
    /**
    * Method to update an LicenseAndCertificate document.
    * @param id LicenseAndCertificate ID to update.
    * @param data Partial LicenseAndCertificate data to update.
    * @returns Promise resolving to the updated LicenseAndCertificate document, or null if not found.
    */
    async updateLicenseAndCertificate(id, data) {
        return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    /**
    * Method to delete an LicenseAndCertificate document.
    * @param id LicenseAndCertificate ID to delete.
    * @returns Promise resolving to the deleted LicenseAndCertificate document, or null if not found.
    */
    async deleteLicenseAndCertificate(id) {
        return await this.model.findByIdAndDelete(id).exec();
    }
    async getAllLicenseAndCertificate() {
        return await this.model.find().exec();
    }
}
export default LicenseAndCertificateModel;
