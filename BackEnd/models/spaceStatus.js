/**
 * This file deals with storing and handling Space Status information.
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

import mongoose from "mongoose";
const Schema = mongoose.Schema;

class SpaceStatusModel {
    constructor() {
        /**
         * Mongoose schema for the Space Status collection.
         */
        const spaceStatusSchema = new Schema({
            dateRange: {
                type: String,
                required: true,
            },
            subscription: {
                type: Schema.ObjectId,
                ref: "SubscribersAnalytics", 
                required: true
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

                // Virtual for this about instance URL.
        spaceStatusSchema.virtual("url").get(function () {
            return "/DashBoard/spaceStatus/" + this._id;
            });
        this.model = mongoose.model('SpaceStatus', spaceStatusSchema);
    }
    // Method to create a new SpaceStatus document
    async createSpaceStatus(data) {
        return await this.model.create(data);
    }
    // Method to find a SpaceStatus document by ID
    async findSpaceStatusById(id) {
        return await this.model.findById(id).exec();
    }
    // Method to update a SpaceStatus document
    async updateSpaceStatus(id, data) {
        return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    // Method to delete a SpaceStatus document
    async deleteSpaceStatus(id) {
        return await this.model.findByIdAndDelete(id).exec();
    }
    /**
   * Method to find all SpaceStatus documents.
   * @returns Promise resolving to an array of all SpaceStatus documents.
   */
    async getAllSpaceStatuses() {
            return await this.model.find().exec();
    }
}
// Create and export Space Status model
export default SpaceStatusModel;
