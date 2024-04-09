/**
 * This file deals with storing and handling Subscribers Analytics information.
 */

import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interface representing the structure of a Subscribers Analytics document.
 */
export interface ISubscribersAnalytics extends Document {
    dateRange: string;
    totalSubscribers: number;
    subscriptionConversionRate: number; // Adding subscription conversion rate
    churnRate: number; 
}

/**
 * Mongoose schema for the Subscribers Analytics collection.
 */
const subscribersAnalyticsSchema = new Schema<ISubscribersAnalytics>({
    dateRange: {
        type: String,
        required: true,
    },
    totalSubscribers: {
        type: Number,
        default: 0,
    },
    subscriptionConversionRate: {
        type: Number,
        default: 0,
    },
    churnRate: {
        type: Number,
        default: 0,
    },
});

// Create and export Subscribers Analytics model
const SubscribersAnalytics = mongoose.model<ISubscribersAnalytics>('SubscribersAnalytics', subscribersAnalyticsSchema);
export default SubscribersAnalytics;
