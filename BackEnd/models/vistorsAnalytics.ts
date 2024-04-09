import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interface representing the structure of a Visitors Analytics document.
 */
export interface IVisitorsAnalytics extends Document {
    dateRange: string;
    totalVisitors: number;
    averageTimeSpentPerVisit: number;
    peakVisitorsTime: Date;
    uniqueVisitors: number;
}

/**
 * Class representing the Visitors Analytics model.
 */
class VisitorAnalyticsModel {
    private readonly model: mongoose.Model<IVisitorsAnalytics>;

    constructor() {
        const visitorsAnalyticsSchema = new Schema<IVisitorsAnalytics>({
            dateRange: {
                type: String,
                required: true,
            },
            totalVisitors: {
                type: Number,
                default: 0,
            },
            averageTimeSpentPerVisit: {
                type: Number,
                default: 0,
            },
            peakVisitorsTime: {
                type: Date,
            },
            uniqueVisitors: {
                type: Number,
                default: 0,
            },
        });

        this.model = mongoose.model<IVisitorsAnalytics>('VisitorsAnalytics', visitorsAnalyticsSchema);
    }

    /**
     * Method to create a new Visitors Analytics document.
     * @param data Partial Visitors Analytics data to create.
     * @returns Promise resolving to the created Visitors Analytics document.
     */
    public createVisitorsAnalytics(data: Partial<IVisitorsAnalytics>): Promise<IVisitorsAnalytics> {
        return this.model.create(data);
    }

    /**
     * Method to find all Visitors Analytics documents.
     * @returns Promise resolving to an array of all Visitors Analytics documents.
     */
    public async getAllVisitorAnalytics(): Promise<IVisitorsAnalytics[]> {
        return this.model.find().exec();
    }

    /**
     * Method to find a Visitors Analytics  document by ID.
     * @param id Visitors Analytics  ID.
     * @returns Promise resolving to the found Visitors Analytics  document, or null if not found.
     */
    public getVisitorAnalyticsById(id: string): Promise<IVisitorsAnalytics | null> {
        return this.model.findById(id).exec();
    }

    /**
     * Method to update a Visitors Analytics  document.
     * @param id Visitors Analytics  ID to update.
     * @param data Partial Visitors Analytics  data to update.
     * @returns Promise resolving to the updated Visitors Analytics  document, or null if not found.
     */
    public updateVisitorAnalytics(id: string, data: Partial<IVisitorsAnalytics>): Promise<IVisitorsAnalytics | null> {
        return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    /**
     * Method to delete a Visitors Analytics  document.
     * @param id Visitors Analytics  ID to delete.
     * @returns Promise resolving to the deleted Visitors Analytics  document, or null if not found.
     */
    public deleteVisitorAnalytics(id: string): Promise<IVisitorsAnalytics | null> {
        return this.model.findByIdAndDelete(id).exec();
    }
}

// Create and export Visitors Analytics model
export default new VisitorAnalyticsModel();
