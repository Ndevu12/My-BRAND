// var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
//     function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
//     return new (P || (P = Promise))(function (resolve, reject) {
//         function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
//         function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
//         function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
//         step((generator = generator.apply(thisArg, _arguments || [])).next());
//     });
// };

import { Schema as _Schema, model as _model } from "mongoose";

const Schema = _Schema;

/**
 *  Define the Subscriber schema using a class
 */
class SubscriberModel {
    constructor() {
        const SubscriberSchema = new Schema({
            full_name: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                required: true,
                unique: true,
            },
            location: {
                type: String,
                required: true,
            },
            preference: {
                type: String,
                required: true,
            },
            subscribe_at: {
                type: Date,
                default: Date.now,
            },
        });

        this.model = _model('Subscriber', SubscriberSchema);
    }
    /**
    * Method to create a new Subscriber document.
    * @param data Partial Subscriber data to create.
    * @returns Promise resolving to the created Subscriber document.
    */
    async createSubscriber(data) {
        return await this.model.create(data);
    }
    /**
     * Method to find an Subscriber document by ID.
     * @param id Subscriber ID.
     * @returns Promise resolving to the found Subscriber document, or null if not found.
     */
    async findSubscriberById(id) {
        return await this.model.findById(id).exec();
    }
    async findSubscriberByEmail(data) {
        return await this.model.findOne({ email: data.email }).exec();
    }
    /**
     * Method to update an Subscriber document.
     * @param id Subscriber ID to update.
     * @param data Partial Subscriber data to update.
     * @returns Promise resolving to the updated Subscriber document, or null if not found.
     */
    async updateSubscriber(id, data) {
        return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    /**
     * Method to delete an Subscriber document.
     * @param id Subscriber ID to delete.
     * @returns Promise resolving to the deleted Subscriber document, or null if not found.
     */
    async deleteSubscriber(id) {
        return await this.model.findByIdAndDelete(id).exec();
    }
    /**
* Method to find all Subscriber documents.
* @returns Promise resolving to an array of all Subscriber documents.
*/
async getAllSubscribers() {
            return await this.model.find().exec();
    }
}
// Create the Subscriber model
export default SubscriberModel;
