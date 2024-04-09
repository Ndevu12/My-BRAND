/**
 * This file deals with storing and handling Project information.
 */

import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interface representing the structure of a Project document.
 */
export interface IProject extends Document {
    intro: string;
    image: string;
    description: string;
    moreDescription: string;
    reference: string;
    createdAt?: Date;
    updatedAt?: Date;
}

/**
 * Class representing the Project model.
 */
class ProjectModel {
    private readonly model: mongoose.Model<IProject>;

    constructor() {
        const projectSchema = new Schema<IProject>({
            intro: {
                type: String,
                required: true,
            },
            image: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            moreDescription: {
                type: String,
                required: true,
            },
            reference: {
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

        this.model = mongoose.model<IProject>('Project', projectSchema);
    }

    /**
     * Method to create a new Project document.
     * @param data Partial Project data to create.
     * @returns Promise resolving to the created Project document.
     */
    public createProject(data: Partial<IProject>): Promise<IProject> {
        return this.model.create(data);
    }

    /**
     * Method to find a Project document by ID.
     * @param id Project ID.
     * @returns Promise resolving to the found Project document, or null if not found.
     */
    public findProjectById(id: string): Promise<IProject | null> {
        return this.model.findById(id).exec();
    }

    /**
     * Method to update a Project document.
     * @param id Project ID to update.
     * @param data Partial Project data to update.
     * @returns Promise resolving to the updated Project document, or null if not found.
     */
    public updateProject(id: string, data: Partial<IProject>): Promise<IProject | null> {
        return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    /**
     * Method to delete a Project document.
     * @param id Project ID to delete.
     * @returns Promise resolving to the deleted Project document, or null if not found.
     */
    public deleteProject(id: string): Promise<IProject | null> {
        return this.model.findByIdAndDelete(id).exec();
    }

    public getAllProjects(): Promise<IProject[]> {
        return this.model.find().exec();
    }
}

export default new ProjectModel();
