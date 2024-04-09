/**
 * This file deals with storing and handling Message information.
 */
import { Schema as _Schema, model as _model } from "mongoose";
const Schema = _Schema;

/**
 * Class representing the Message model.
 */
class MessageModel {
    constructor() {
        const messageSchema = new Schema({
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
            
        this.model = _model('Message', messageSchema);
    }
    /**
     * Method to create a new Message document.
     * @param data Partial Message data to create.
     * @returns Promise resolving to the created Message document.
     */
    async createMessage(data) {
        return await this.model.create(data);
    }
    /**
     * Method to find a Message document by ID.
     * @param id Message ID.
     * @returns Promise resolving to the found Message document, or null if not found.
     */
    async findMessageById(id) {
        return await  this.model.findById(id).exec();
    }
    /**
     * Method to update a Message document.
     * @param id Message ID to update.
     * @param data Partial Message data to update.
     * @returns Promise resolving to the updated Message document, or null if not found.
     */
    async updateMessage(id, data) {
        return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    /**
     * Method to delete a Message document.
     * @param id Message ID to delete.
     * @returns Promise resolving to the deleted Message document, or null if not found.
     */
    async deleteMessage(id) {
        return await this.model.findByIdAndDelete(id).exec();
    }
    async getAllMessages() {
        return await this.model.find().exec();
    }
}
// hijokl
export default MessageModel;
