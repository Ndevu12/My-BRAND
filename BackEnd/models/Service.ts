/**
 * This file deals with storing and handling Service information.
 */

import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interface representing the structure of a Service document.
 */
export interface IService extends Document {
    title: string;
    intro: string;
    image: string;
    description: string;
    moreContent: string;
    projectSample: string;
    createdAt?: Date;
    updatedAt?: Date;
}

/**
 * Class representing the Service model.
 */
class ServiceModel {
    private readonly model: mongoose.Model<IService>;

    constructor() {
        const serviceSchema = new Schema<IService>({
            title: {
                type: String,
                required: true,
            },
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
            moreContent: {
                type: String,
                required: true,
            },
            projectSample: {
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

        this.model = mongoose.model<IService>('Service', serviceSchema);
    }

    /**
     * Method to create a new Service document.
     * @param data Partial Service data to create.
     * @returns Promise resolving to the created Service document.
     */
    public createService(data: Partial<IService>): Promise<IService> {
        return this.model.create(data);
    }

    /**
     * Method to find a Service document by ID.
     * @param id Service ID.
     * @returns Promise resolving to the found Service document, or null if not found.
     */
    public findServiceById(id: string): Promise<IService | null> {
        return this.model.findById(id).exec();
    }

    /**
     * Method to update a Service document.
     * @param id Service ID to update.
     * @param data Partial Service data to update.
     * @returns Promise resolving to the updated Service document, or null if not found.
     */
    public updateService(id: string, data: Partial<IService>): Promise<IService | null> {
        return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    /**
     * Method to delete a Service document.
     * @param id Service ID to delete.
     * @returns Promise resolving to the deleted Service document, or null if not found.
     */
    public deleteService(id: string): Promise<IService | null> {
        return this.model.findByIdAndDelete(id).exec();
    }

    public getAllServices(): Promise<IService[]> {
        return this.model.find().exec();
    }
}

export default new ServiceModel();
