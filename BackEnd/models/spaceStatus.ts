/**
 * This file deals with storing and handling Space Status information.
 */

import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interface representing the structure of a Space Status document.
 */
export interface ISpaceStatus extends Document {
    dateRange: string;
    subscription: number;
    blogImpression: number;
    movement: number;
    directMessage: number;
    report: number;
    totalSubscription: number;
}

class SpaceStatusModel{
    private readonly model: mongoose.Model<ISpaceStatus>;

    constructor(){
/**
 * Mongoose schema for the Space Status collection.
 */
const spaceStatusSchema = new Schema<ISpaceStatus>({
    dateRange: {
        type: String,
        required: true,
    },
    subscription: {
        type: Number,
        default: 0,
    },
    blogImpression: {
        type: Number,
        default: 0,
    },
    movement: {
        type: Number,
        default: 0,
    },
    directMessage: {
        type: Number,
        default: 0,
    },
    report: {
        type: Number,
        default: 0,
    },
    totalSubscription: {
        type: Number,
        default: 0,
    },
    });

    this.model = mongoose.model<ISpaceStatus>('SpaceStatus', spaceStatusSchema);
    }

// Method to create a new SpaceStatus document
public createSpaceStatus(data: Partial<ISpaceStatus>): Promise<ISpaceStatus> {
    return this.model.create(data);
}

// Method to find a SpaceStatus document by ID
public findSpaceStatusById(id: string): Promise<ISpaceStatus | null> {
    return this.model.findById(id).exec();
}

// Method to update a SpaceStatus document
public updateSpaceStatus(id: string, data: Partial<ISpaceStatus>): Promise<ISpaceStatus | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
}

// Method to delete a SpaceStatus document
public deleteSpaceStatus(id: string): Promise<ISpaceStatus | null> {
    return this.model.findByIdAndDelete(id).exec();
}

  /**
 * Method to find all SpaceStatus documents.
 * @returns Promise resolving to an array of all SpaceStatus documents.
 */
  public async getAllSpaceStatuses(): Promise<ISpaceStatus[]> {
    return this.model.find().exec();
}
}

// Create and export Space Status model
export default new  SpaceStatusModel();
