/**
 * This file deals with storing and handling Analytics information.
 */
// var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
//     function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
//     return new (P || (P = Promise))(function (resolve, reject) {
//         function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
//         function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
//         function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
//         step((generator = generator.apply(thisArg, _arguments || [])).next());
//     });
// };

import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

class Analytics {
    constructor() {
        /**
         * Mongoose schema for the Analytics collection.
         */
        const analyticsSchema = new Schema({
            mostViewedAnalytics: {
                type: String,
                default: [],
            },
            mostLikedAnalytics: {
                type: String,
                default: [],
            },
            mostSharedAnalytics: {
                type: String,
                default: [],
            },
            visitors: {
                type: Number,
                default: 0,
            },
            subscribers: {
                type: Number,
                default: 0,
            },
            spaceStatus: {
                type: String,
                default: 'active',
            },
            dateRange: {
                type: Date,
                required: true,
            },
        });

        // Virtual for this about instance URL.
        analyticsSchema.virtual("url").get(function () {
            return "/analyticsRoutes/analytics/" + this._id;
            });

        this.model = model('Analytics', analyticsSchema);
    }
    // Method to create a new Analytics document
    async createAnalytics(data) {
        const newAnalytics = await this.model.create(data);
        newAnalytics.save();
        return newAnalytics;
    }
    // Method to find a Analytics document by ID
    async findAnalyticsById(id) {
        return await this.model.findById(id).exec();
    }
    // Method to update a Analytics document
    async updateAnalytics(id, data) {
        const updatedAnalytics = await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
        return updatedAnalytics;
    }
    // Method to delete a Analytics document
    async deleteAnalytics(id) {
        return await this.model.findByIdAndDelete(id).exec();
    }
    /**
   * Method to find all Analytics documents.
   * @returns Promise resolving to an array of all Analytics documents.
   */
    async getAllAnalyticss() {
            return await this.model.find().exec();
    }
}
// Create and export Analytics model
export default Analytics;
