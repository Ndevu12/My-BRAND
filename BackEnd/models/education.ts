/**
 * This file deals with storing and handling Education information.
 */

import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interface representing the structure of an education document.
 */
export interface IEducation extends Document {
    title: string;
    school: string;
    startDate: Date;
    compilationDate: Date;
    certificate: string;
}

/**
 * Class representing the education model.
 */
class EducationModel {
    private readonly model: mongoose.Model<IEducation>;

    constructor() {
        const educationSchema = new Schema<IEducation>({
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
                type: String,
                required: true,
            },
        });

        this.model = mongoose.model<IEducation>('Education', educationSchema);
    }

    /**
     * Method to create a new Education document.
     * @param data Partial Education data to create.
     * @returns Promise resolving to the created Education document.
     */
    public createEducation(data: Partial<IEducation>): Promise<IEducation> {
        return this.model.create(data);
    }

    /**
     * Method to find an Education document by ID.
     * @param id Education ID.
     * @returns Promise resolving to the found Education document, or null if not found.
     */
    public getEducationById(id: string): Promise<IEducation | null> {
        return this.model.findById(id).exec();
    }

    /**
     * Method to update an Education document.
     * @param id Education ID to update.
     * @param data Partial Education data to update.
     * @returns Promise resolving to the updated Education document, or null if not found.
     */
    public updateEducation(id: string, data: Partial<IEducation>): Promise<IEducation | null> {
        return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    /**
     * Method to delete an Education document.
     * @param id Education ID to delete.
     * @returns Promise resolving to the deleted Education document, or null if not found.
     */
    public deleteEducation(id: string): Promise<IEducation | null> {
        return this.model.findByIdAndDelete(id).exec();
    }

    public getAllEducation(): Promise<IEducation[]> {
        return this.model.find().exec();
    }
    
}

export default new EducationModel();
