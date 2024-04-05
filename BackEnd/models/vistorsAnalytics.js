// var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
//     function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
//     return new (P || (P = Promise))(function (resolve, reject) {
//         function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
//         function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
//         function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
//         step((generator = generator.apply(thisArg, _arguments || [])).next());
//     });
// };

import mongoose from "mongoose";

const Schema = mongoose.Schema;

/**
 * Class representing the Visitors Analytics model.
 */
class VisitorAnalyticsModel {
    constructor() {
        const visitorsAnalyticsSchema = new Schema({
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

     // Virtual for this about instance URL.
     visitorsAnalyticsSchema.virtual("url").get(function () {
        return "/AdminDashBoard/visitorsAnalytics/" + this._id;
        });
        this.model = mongoose.model('VisitorsAnalytics', visitorsAnalyticsSchema);
    }
    /**
     * Method to create a new Visitors Analytics document.
     * @param data Partial Visitors Analytics data to create.
     * @returns Promise resolving to the created Visitors Analytics document.
     */
    async createVisitorsAnalytics(data) {
        return await this.model.create(data);
    }
    /**
     * Method to find all Visitors Analytics documents.
     * @returns Promise resolving to an array of all Visitors Analytics documents.
     */
    async getAllVisitorAnalytics() {
            return await this.model.find().exec();
    }
    /**
     * Method to find a Visitors Analytics  document by ID.
     * @param id Visitors Analytics  ID.
     * @returns Promise resolving to the found Visitors Analytics  document, or null if not found.
     */
    async getVisitorAnalyticsById(id) {
        return await this.model.findById(id).exec();
    }
    /**
     * Method to update a Visitors Analytics  document.
     * @param id Visitors Analytics  ID to update.
     * @param data Partial Visitors Analytics  data to update.
     * @returns Promise resolving to the updated Visitors Analytics  document, or null if not found.
     */
    async updateVisitorAnalytics(id, data) {
        return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    /**
     * Method to delete a Visitors Analytics  document.
     * @param id Visitors Analytics  ID to delete.
     * @returns Promise resolving to the deleted Visitors Analytics  document, or null if not found.
     */
    async deleteVisitorAnalytics(id) {
        return await this.model.findByIdAndDelete(id).exec();
    }
}
// Create and export Visitors Analytics model
export default VisitorAnalyticsModel;
