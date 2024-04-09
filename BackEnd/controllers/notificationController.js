// var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
//     function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
//     return new (P || (P = Promise))(function (resolve, reject) {
//         function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
//         function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
//         function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
//         step((generator = generator.apply(thisArg, _arguments || [])).next());
//     });
// };

import NotificationModel from '../models/Notification.js';

class NotificationController {
    /**
     * Method to create a new notification.
     * @param req Request object containing notification data.
     * @param res Response object to send the result.
     */
    async createNotification(req, res) {
            try {
                const notificationData = req.body;
                const newNotification = await NotificationModel.createNotification(notificationData);
                res.status(201).json(newNotification);
            }
            catch (error) {
                console.error('Error creating notification:', error);
                res.status(500).send('Internal Server Error');
            }
    }
    /**
     * Method to retrieve all notifications.
     * @param req Request object.
     * @param res Response object to send the notifications.
     */
    async getAllNotifications(req, res) {
            try {
                const notifications = await NotificationModel.getAllNotifications();
                res.status(200).json(notifications);
            }
            catch (error) {
                console.error('Error fetching notifications:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
    }
    /**
     * Method to retrieve a notification by its ID.
     * @param req Request object containing the notification ID.
     * @param res Response object to send the notification.
     */
    async getNotificationById(req, res) {
            try {
                const { id } = req.params;
                const notification = await NotificationModel.findNotificationById(id);
                if (notification) {
                    res.status(200).json(notification);
                }
                else {
                    res.status(404).json({ error: 'Notification not found' });
                }
            }
            catch (error) {
                console.error('Error fetching notification by ID:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
    }
    /**
     * Method to update a notification by its ID.
     * @param req Request object containing the notification ID and updated data.
     * @param res Response object to send the updated notification.
     */
    async updateNotification(req, res) {
            try {
                const { id } = req.params;
                const updatedNotificationData = req.body;
                const updatedNotification = await NotificationModel.updateNotification(id, updatedNotificationData);
                if (updatedNotification) {
                    res.status(200).json(updatedNotification);
                }
                else {
                    res.status(404).json({ error: 'Notification not found' });
                }
            }
            catch (error) {
                console.error('Error updating notification:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
    }
    /**
     * Method to delete a notification by its ID.
     * @param req Request object containing the notification ID.
     * @param res Response object to send the result.
     */
    async deleteNotification(req, res) {
            try {
                const { id } = req.params;
                const deletedNotification = await NotificationModel.deleteNotification(id);
                if (deletedNotification) {
                    res.status(200).json({ message: 'Notification deleted successfully' });
                }
                else {
                    res.status(404).json({ error: 'Notification not found' });
                }
            }
            catch (error) {
                console.error('Error deleting notification:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
    }
}
// hijokl
export default NotificationController;
