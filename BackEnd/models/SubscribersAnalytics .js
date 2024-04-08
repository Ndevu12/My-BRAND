/**
 * This file deals with storing and handling Subscribers Analytics information.
 */
import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;


class SubscribersAnalytics {
    constructor(){
/**
 * Mongoose schema for the Subscribers Analytics collection.
 */
const subscribersAnalyticsSchema = new Schema({
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
    
// Create Subscribers Analytics model
this.model = model('SubscribersAnalytics', subscribersAnalyticsSchema);
    }

    createsubscribersAnalytics(){
        return this.model.create(data);
    }

     // Method to find a comment by ID
     findsubscribersAnalyticsById(id) {
        return this.model.findById(id).exec();
    }
    // Method to update a comment
    updatesubscribersAnalytics(id, data) {
        return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    // Method to delete a comment by ID
    deletesubscribersAnalytics(id) {
        return this.model.findByIdAndDelete(id).exec();
    }
    getAllsubscribersAnalytics() {
        return this.model.find().exec();
    }
}
// export Subscribers Analytics model
export default SubscribersAnalytics;
