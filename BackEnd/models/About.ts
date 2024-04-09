/**
 * This file deals with storing and handling about information.
 */

import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interface representing the structure of an about document.
 */
export interface IAbout extends Document {
    head: string;
    intro: string;
    mission: string;
    educationIds: string[];
    experienceIds: string[];
    internship: string;
    licenseAndCertificate: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

/**
 * Class representing the About model.
 */
class AboutModel {
    private readonly model: mongoose.Model<IAbout>;

    constructor() {
        const aboutSchema = new Schema<IAbout>({
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
                type: [String],
                default: [],
            },
            experienceIds: {
                type: [String],
                default: [],
            },
            internship: {
                type: String,
                required: true,
            },
            licenseAndCertificate: {
                type: [String],
                default: [],
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

        this.model = mongoose.model<IAbout>('About', aboutSchema);
    }

    /**
     * Method to create a new about document.
     * @param data Partial about data to create.
     * @returns Promise resolving to the created about document.
     */
    public createAbout(data: Partial<IAbout>): Promise<IAbout> {
        return this.model.create(data);
    }

    /**
     * Method to find an about document by ID.
     * @param id About ID.
     * @returns Promise resolving to the found about document, or null if not found.
     */
    public findAboutById(id: string): Promise<IAbout | null> {
        return this.model.findById(id).exec();
    }

    /**
     * Method to update an about document.
     * @param id About ID to update.
     * @param data Partial about data to update.
     * @returns Promise resolving to the updated about document, or null if not found.
     */
    public updateAbout(id: string, data: Partial<IAbout>): Promise<IAbout | null> {
        return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    /**
     * Method to delete an about document.
     * @param id About ID to delete.
     * @returns Promise resolving to the deleted about document, or null if not found.
     */
    public deleteAbout(id: string): Promise<IAbout | null> {
        return this.model.findByIdAndDelete(id).exec();
    }

    public getAllAbout(): Promise<IAbout[]> {
        return this.model.find().exec();
    }
}

export default new AboutModel();
