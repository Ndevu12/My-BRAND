/**
 * This file deals with storing and handling Message information.
 */

import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interface representing the structure of a Message document.
 */
export interface IMessage extends Document {
    senderName: string;
    message: string;
    sendAt: Date;
    notifyMe: boolean;
    avatarOrImage: string;
}

/**
 * Class representing the Message model.
 */
class MessageModel {
    private readonly model: mongoose.Model<IMessage>;

    constructor() {
        const messageSchema = new Schema<IMessage>({
            senderName: {
                type: String,
                required: true,
            },
            message: {
                type: String,
                required: true,
            },
            sendAt: {
                type: Date,
                required: true,
            },
            notifyMe: {
                type: Boolean,
                required: true,
            },
            avatarOrImage: {
                type: String,
                required: true,
            },
        });

        this.model = mongoose.model<IMessage>('Message', messageSchema);
    }

    /**
     * Method to create a new Message document.
     * @param data Partial Message data to create.
     * @returns Promise resolving to the created Message document.
     */
    public createMessage(data: Partial<IMessage>): Promise<IMessage> {
        return this.model.create(data);
    }

    /**
     * Method to find a Message document by ID.
     * @param id Message ID.
     * @returns Promise resolving to the found Message document, or null if not found.
     */
    public findMessageById(id: string): Promise<IMessage | null> {
        return this.model.findById(id).exec();
    }

    /**
     * Method to update a Message document.
     * @param id Message ID to update.
     * @param data Partial Message data to update.
     * @returns Promise resolving to the updated Message document, or null if not found.
     */
    public updateMessage(id: string, data: Partial<IMessage>): Promise<IMessage | null> {
        return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    /**
     * Method to delete a Message document.
     * @param id Message ID to delete.
     * @returns Promise resolving to the deleted Message document, or null if not found.
     */
    public deleteMessage(id: string): Promise<IMessage | null> {
        return this.model.findByIdAndDelete(id).exec();
    }

    public getAllMessages(): Promise<IMessage[]>{
        return this.model.find().exec();
    }
}

export default new MessageModel();
