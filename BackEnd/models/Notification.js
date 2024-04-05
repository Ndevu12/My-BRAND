/**
 * This file deals with storing and handling Notification information.
 */
import { Schema as _Schema, model as _model } from "mongoose";
const Schema = _Schema;

/**
 * Class representing the Notification model.
 */
class NotificationModel {
    constructor() {
        const notificationSchema = new Schema({
            title: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            sendAt: {
                type: Date,
                required: true,
            },
        });

        // Virtual for this message instance URL.
        notificationSchema.virtual("url").get(function () {
            return "/DashBoard/message/" + this._id;
            });
        this.model = _model('Notification', notificationSchema);
    }
    /**
     * Method to create a new Notification document.
     * @param data Partial Notification data to create.
     * @returns Promise resolving to the created Notification document.
     */
    async createNotification(data) {
        return await this.model.create(data);
    }
    /**
     * Method to find a Notification document by ID.
     * @param id Notification ID.
     * @returns Promise resolving to the found Notification document, or null if not found.
     */
    async findNotificationById(id) {
        return await this.model.findById(id).exec();
    }
    /**
     * Method to update a Notification document.
     * @param id Notification ID to update.
     * @param data Partial Notification data to update.
     * @returns Promise resolving to the updated Notification document, or null if not found.
     */
    async updateNotification(id, data) {
        return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    /**
     * Method to delete a Notification document.
     * @param id Notification ID to delete.
     * @returns Promise resolving to the deleted Notification document, or null if not found.
     */
    async deleteNotification(id) {
        return await this.model.findByIdAndDelete(id).exec();
    }

    async getAllNotifications() {
        return await this.model.find().exec();
    }
}
export default NotificationModel;
