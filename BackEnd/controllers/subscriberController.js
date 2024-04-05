// var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
//     function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
//     return new (P || (P = Promise))(function (resolve, reject) {
//         function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
//         function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
//         function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
//         step((generator = generator.apply(thisArg, _arguments || [])).next());
//     });
// };

import SubscriberServices  from '../services/subscriberService.js';
import SubscriberModel from '../models/Subscriber.js';

const  NotifySubscriberServices = new SubscriberServices();
class SubscriberController {
    /**
     * Method to create a new subscriber.
     * @param req Request object containing subscriber data.
     * @param res Response object to send the result.
     */
    async createSubscriber(req, res) {
            try {
                const subscriberData = req.body;
                const { email } = req.body;
                // Check if subscriber with the same email already exists
                const existingSubscriber = await SubscriberModel.findSubscriberByEmail({ email });
                if (existingSubscriber) {
                    res.status(400).json({ message: 'Subscriber with this email already exists' });
                    console.error('Error fetching subscribers: /already subscribed');
                    return;
                }
                const newSubscriber = await SubscriberModel.createSubscriber(subscriberData);
                /**
                  * Notify subscribers
                  */
                const sendSubscriptionMessage = await NotifySubscriberServices.notifySubscriberOnSubscription(email);

                if (sendSubscriptionMessage){
                    console.log('Sending subscription message is done successfully');
                }else{
                    console.log('Sending subscription message is not done successfully. There was an error', sendSubscriptionMessage);
                }

                if (newSubscriber){
                    console.log("Subscriber created successfully")
                    res.status(201).json(newSubscriber);
                }   
            }
            catch (error) {
                console.error('Error creating subscriber:', error);
                res.status(500).send('Internal Server Error');
            }
    }
    /**
     * Method to retrieve all subscribers.
     * @param req Request object.
     * @param res Response object to send the subscribers.
     */
    async getAllSubscribers(req, res) {
            try {
                const subscribers = await SubscriberModel.getAllSubscribers();
                res.status(200).json(subscribers);
            }
            catch (error) {
                console.error('Error fetching subscribers:', error);
                res.status(500).send('Internal Server Error');
            }
    }
    /**
     * Method to retrieve a subscriber by its ID.
     * @param req Request object containing the subscriber ID.
     * @param res Response object to send the subscriber.
     */
    async getSubscriberById(req, res) {
            try {
                const { id } = req.params;
                const subscriber = await SubscriberModel.findSubscriberById(id);
                if (subscriber) {
                    res.status(200).json(subscriber);
                }
                else {
                    res.status(404).send('Subscriber not found');
                }
            }
            catch (error) {
                console.error('Error fetching subscriber by ID:', error);
                res.status(500).send('Internal Server Error');
            }
    }
    /**
     * Method to update a subscriber by its ID.
     * @param req Request object containing the subscriber ID and updated data.
     * @param res Response object to send the updated subscriber.
     */
    async updateSubscriber(req, res) {
            try {
                const { id } = req.params;
                const updatedSubscriberData = req.body;
                const updatedSubscriber = await SubscriberModel.updateSubscriber(id, updatedSubscriberData);
                if (updatedSubscriber) {
                    res.status(200).json(updatedSubscriber);
                }
                else {
                    res.status(404).send('Subscriber not found');
                }
            }
            catch (error) {
                console.error('Error updating subscriber:', error);
                res.status(500).send('Internal Server Error');
            }
    }
    /**
     * Method to delete a subscriber by its ID.
     * @param req Request object containing the subscriber ID.
     * @param res Response object to send the result.
     */
    async deleteSubscriber(req, res) {
            try {
                const { id } = req.params;
                const deletedSubscriber = await SubscriberModel.deleteSubscriber(id);
                if (deletedSubscriber) {
                    res.status(200).send('Subscriber deleted successfully');
                }
                else {
                    res.status(404).send('Subscriber not found');
                }
            }
            catch (error) {
                console.error('Error deleting subscriber:', error);
                res.status(500).send('Internal Server Error');
            }
    }
}
export default SubscriberController;
