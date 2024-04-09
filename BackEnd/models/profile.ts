/**
 * This file deals with storing and handling Profile information.
 */

import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interface representing the structure of a Profile document.
 */
export interface IProfile extends Document {
    profileImage: string;
    name: string;
    location: string;
    contactInfo: string;
    password: string;
    displayName: string;
    email: string;
    phone: string;
}

/**
 * Class representing the Profile model.
 */
class ProfileModel {
    private readonly model: mongoose.Model<IProfile>;

    constructor() {
        const profileSchema = new Schema<IProfile>({
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
            password: {
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

        this.model = mongoose.model<IProfile>('Profile', profileSchema);
    }

    /**
     * Method to create a new Profile document.
     * @param data Partial Profile data to create.
     * @returns Promise resolving to the created Profile document.
     */
    public createProfile(data: Partial<IProfile>): Promise<IProfile> {
        return this.model.create(data);
    }

    /**
     * Method to find a Profile document by ID.
     * @param id Profile ID.
     * @returns Promise resolving to the found Profile document, or null if not found.
     */
    public findProfileById(id: string): Promise<IProfile | null> {
        return this.model.findById(id).exec();
    }

    /**
     * Method to update a Profile document.
     * @param id Profile ID to update.
     * @param data Partial Profile data to update.
     * @returns Promise resolving to the updated Profile document, or null if not found.
     */
    public updateProfile(id: string, data: Partial<IProfile>): Promise<IProfile | null> {
        return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    /**
     * Method to delete a Profile document.
     * @param id Profile ID to delete.
     * @returns Promise resolving to the deleted Profile document, or null if not found.
     */
    public deleteProfile(id: string): Promise<IProfile | null> {
        return this.model.findByIdAndDelete(id).exec();
    }

    public getAllProfiles(): Promise<IProfile[]> {
        return this.model.find().exec();
    }
}

export default new ProfileModel();
