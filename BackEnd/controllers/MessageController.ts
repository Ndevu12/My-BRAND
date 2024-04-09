/**
 * Controller for handling Message-related operations.
 */
import { Request, Response } from 'express';
import MessageModel, { IMessage } from '../models/messages';

class MessageController {
    /**
     * Method to create a new message.
     * @param req Request object containing message data.
     * @param res Response object to send the result.
     */
    public async createMessage(req: Request, res: Response): Promise<void> {
        try {
            const messageData: Partial<IMessage> = req.body;
            const newMessage = await MessageModel.createMessage(messageData);
            res.status(201).json(newMessage);
        } catch (error) {
            console.error('Error creating message:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    /**
     * Method to retrieve all messages.
     * @param req Request object.
     * @param res Response object to send the messages.
     */
    public async getAllMessages(req: Request, res: Response): Promise<void> {
        try {
            const messages = await MessageModel.getAllMessages();
            res.status(200).json(messages);
        } catch (error) {
            console.error('Error fetching messages:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    /**
     * Method to retrieve a message by its ID.
     * @param req Request object containing the message ID.
     * @param res Response object to send the message.
     */
    public async getMessageById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const message = await MessageModel.findMessageById(id);
            if (message) {
                res.status(200).json(message);
            } else {
                res.status(404).json({ error: 'Message not found' });
            }
        } catch (error) {
            console.error('Error fetching message by ID:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    /**
     * Method to update a message by its ID.
     * @param req Request object containing the message ID and updated data.
     * @param res Response object to send the updated message.
     */
    public async updateMessage(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const updatedMessageData = req.body;
            const updatedMessage = await MessageModel.updateMessage(id, updatedMessageData);
            if (updatedMessage) {
                res.status(200).json(updatedMessage);
            } else {
                res.status(404).json({ error: 'Message not found' });
            }
        } catch (error) {
            console.error('Error updating message:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    /**
     * Method to delete a message by its ID.
     * @param req Request object containing the message ID.
     * @param res Response object to send the result.
     */
    public async deleteMessage(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const deletedMessage = await MessageModel.deleteMessage(id);
            if (deletedMessage) {
                res.status(200).json({ message: 'Message deleted successfully' });
            } else {
                res.status(404).json({ error: 'Message not found' });
            }
        } catch (error) {
            console.error('Error deleting message:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default new MessageController();
