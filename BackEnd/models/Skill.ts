/**
 * This file deals with storing and handling skills.
 */

import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interface representing the structure of a skill document.
 */
export interface ISkill extends Document {
    title: string;
    description: string;
    image: string;
    certificate: string;
    compilationDate?: Date;
}

/**
 * Class representing the Skill model.
 */
class SkillModel {
    private readonly model: mongoose.Model<ISkill>;

    constructor() {
        const skillSchema = new Schema<ISkill>({
            title: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            image: {
                type: String,
                required: true,
            },
            certificate: {
                type: String,
                required: true,
            },
            compilationDate: {
                type: Date,
                default: Date.now,
            },
        });

        this.model = mongoose.model<ISkill>('Skill', skillSchema);
    }

    /**
     * Method to create a new skill document.
     * @param data Partial skill data to create.
     * @returns Promise resolving to the created skill document.
     */
    public createSkill(data: Partial<ISkill>): Promise<ISkill> {
        return this.model.create(data);
    }

    /**
     * Method to find a skill document by ID.
     * @param id Skill ID.
     * @returns Promise resolving to the found skill document, or null if not found.
     */
    public findSkillById(id: string): Promise<ISkill | null> {
        return this.model.findById(id).exec();
    }

    /**
     * Method to update a skill document.
     * @param id Skill ID to update.
     * @param data Partial skill data to update.
     * @returns Promise resolving to the updated skill document, or null if not found.
     */
    public updateSkill(id: string, data: Partial<ISkill>): Promise<ISkill | null> {
        return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    /**
     * Method to delete a skill document.
     * @param id Skill ID to delete.
     * @returns Promise resolving to the deleted skill document, or null if not found.
     */
    public deleteSkill(id: string): Promise<ISkill | null> {
        return this.model.findByIdAndDelete(id).exec();
    }

    public getAllSkills(): Promise<ISkill[]> {
        return this.model.find().exec();
    }
}

export default new SkillModel();
