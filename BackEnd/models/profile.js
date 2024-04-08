/**
 * This file deals with storing and handling Profile information.
 */
import { Schema as _Schema, model as _model } from "mongoose";
const Schema = _Schema;

/**
 * Class representing the Profile model.
 */
class ProfileModel {
    constructor() {
        const profileSchema = new Schema({
            profileImage: {
                type: String,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            location: {
                type: String,
                required: true,
            },
            contactInfo: {
                type: String,
                required: true,
            },
            displayName: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                required: true,
            },
            phone: {
                type: String,
                required: true,
            },
        });

        this.model = _model('Profile', profileSchema);
    }
    /**
     * Method to create a new Profile document.
     * @param data Partial Profile data to create.
     * @returns Promise resolving to the created Profile document.
     */
    async createProfile(data) {
        return await this.model.create(data);
    }
    /**
     * Method to find a Profile document by ID.
     * @param id Profile ID.
     * @returns Promise resolving to the found Profile document, or null if not found.
     */
    async findProfileById(id) {
        return await this.model.findById(id).exec();
    }
    /**
     * Method to update a Profile document.
     * @param id Profile ID to update.
     * @param data Partial Profile data to update.
     * @returns Promise resolving to the updated Profile document, or null if not found.
     */
    async updateProfile(id, data) {
        return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    /**
     * Method to delete a Profile document.
     * @param id Profile ID to delete.
     * @returns Promise resolving to the deleted Profile document, or null if not found.
     */
    async deleteProfile(id) {
        return await this.model.findByIdAndDelete(id).exec();
    }
    async getAllProfiles() {
        return await this.model.find().exec();
    }
}
export default ProfileModel;
