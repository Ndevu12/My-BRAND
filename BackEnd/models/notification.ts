/**
 * This file deals with storing and handling Notification information.
 */

import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interface representing the structure of a Notification document.
 */
export interface INotification extends Document {
    notificationId: string;
    title: string;
    description: string;
    sendAt: Date;
}

/**
 * Class representing the Notification model.
 */
class NotificationModel {
    private readonly model: mongoose.Model<INotification>;

    constructor() {
        const notificationSchema = new Schema<INotification>({
            notificationId: {
                type: String,
                required: true,
            },
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

        this.model = mongoose.model<INotification>('Notification', notificationSchema);
    }

    /**
     * Method to create a new Notification document.
     * @param data Partial Notification data to create.
     * @returns Promise resolving to the created Notification document.
     */
    public createNotification(data: Partial<INotification>): Promise<INotification> {
        return this.model.create(data);
    }

    /**
     * Method to find a Notification document by ID.
     * @param id Notification ID.
     * @returns Promise resolving to the found Notification document, or null if not found.
     */
    public findNotificationById(id: string): Promise<INotification | null> {
        return this.model.findById(id).exec();
    }

    /**
     * Method to update a Notification document.
     * @param id Notification ID to update.
     * @param data Partial Notification data to update.
     * @returns Promise resolving to the updated Notification document, or null if not found.
     */
    public updateNotification(id: string, data: Partial<INotification>): Promise<INotification | null> {
        return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    /**
     * Method to delete a Notification document.
     * @param id Notification ID to delete.
     * @returns Promise resolving to the deleted Notification document, or null if not found.
     */
    public deleteNotification(id: string): Promise<INotification | null> {
        return this.model.findByIdAndDelete(id).exec();
    }

    public getAllNotifications(): Promise<INotification[]> {
        return this.model.find().exec();
    }
}

export default new NotificationModel();
