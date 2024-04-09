/**
 * This file deals with storing and handling experiences.
 */

import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interface representing the structure of an experience document.
 */
export interface IExperience extends Document {
    title: string;
    content: string;
    companyWorkedAt: string;
    image: string;
    duration: string;
    certificateImage: string;
    createdAt?: Date;
    updatedAt?: Date;
}

/**
 * Class representing the Experience model.
 */
class ExperienceModel {
    private readonly model: mongoose.Model<IExperience>;

    constructor() {
        const experienceSchema = new Schema<IExperience>({
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
            image: {
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

        this.model = mongoose.model<IExperience>('Experience', experienceSchema);
    }

    /**
     * Method to create a new experience document.
     * @param data - The data for the new experience.
     * @returns A promise that resolves with the created experience.
     */
    public createExperience(data: Partial<IExperience>): Promise<IExperience> {
        return this.model.create(data);
    }

    /**
     * Method to find an experience document by ID.
     * @param id - The ID of the experience to find.
     * @returns A promise that resolves with the found experience, or null if not found.
     */
    public findExperienceById(id: string): Promise<IExperience | null> {
        return this.model.findById(id).exec();
    }

    /**
     * Method to update an experience document.
     * @param id - The ID of the experience to update.
     * @param data - The updated data for the experience.
     * @returns A promise that resolves with the updated experience, or null if not found.
     */
    public updateExperience(id: string, data: Partial<IExperience>): Promise<IExperience | null> {
        return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    /**
     * Method to delete an experience document.
     * @param id - The ID of the experience to delete.
     * @returns A promise that resolves with the deleted experience, or null if not found.
     */
    public deleteExperience(id: string): Promise<IExperience | null> {
        return this.model.findByIdAndDelete(id).exec();
    }

    public getAllExperience(): Promise<IExperience[]>{
        return this.model.find().exec();
    }
}

export default new ExperienceModel();
