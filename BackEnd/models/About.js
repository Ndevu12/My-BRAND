/**
 * This file deals with storing and handling about information.
 */
import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

import url from "url";

/**
 * Class representing the About model.
 */
class AboutModel {
    constructor() {
        const aboutSchema = new Schema({
            head: {
                type: String,
                required: true,
            },
            intro: {
                type: String,
                required: true,
            },
            mission: {
                type: String,
                required: true,
            },
            educationIds: {
                type: Schema.ObjectId,
                ref: "Education", 
                required: true
            },
            experienceIds: {
                type: Schema.ObjectId,
                ref: "experience", 
                required: true
            },
            internship: {
                type: Schema.ObjectId,
                ref: "interneship", 
                required: true
            },
            licenseAndCertificate: {
                type: Schema.ObjectId,
                ref: "licenseAndCertificate", 
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
        
        aboutSchema.virtual("url").get(function () {
            return "/about/" + this._id+"/create";
            });

        this.model = model('About', aboutSchema);
    }

    /**
     * Method to create a new about document.
     * @param data Partial about data to create.
     * @returns Promise resolving to the created about document.
     */
    async createAbout(data) {
        try{
        const about = await this.model.create(data);
        about.save();
        return about;
        }catch(error){
          console.log("Couldn't create about", error);
          return error;
        }
    }
    /**
     * Method to find an about document by ID.
     * @param id About ID.
     * @returns Promise resolving to the found about document, or null if not found.
     */
    async findAboutById(id) {
        return await this.model.findById(id).exec();
    }
    /**
     * Method to update an about document.
     * @param id About ID to update.
     * @param data Partial about data to update.
     * @returns Promise resolving to the updated about document, or null if not found.
     */
    async updateAbout(id, data) {
        const updated = await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
        updated.save();
        return updated;
    }
    /**
     * Method to delete an about document.
     * @param id About ID to delete.
     * @returns Promise resolving to the deleted about document, or null if not found.
     */
    async deleteAbout(id) {
        return await this.model.findByIdAndDelete(id).exec();
    }
    async getAllAbout() {
        return await this.model.find().exec();
    }
}
export default AboutModel;
