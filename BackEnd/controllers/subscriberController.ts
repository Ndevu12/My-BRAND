import { Request, Response } from 'express';
import subscriberService from '../services/subscriberService';
import SubscriberModel, { ISubscriber } from '../models/Subscriber';

class SubscriberController {
    /**
     * Method to create a new subscriber.
     * @param req Request object containing subscriber data.
     * @param res Response object to send the result.
     */
    public async createSubscriber(req: Request, res: Response): Promise<void> {
        try {
            const subscriberData: Partial<ISubscriber> = req.body;
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
            await subscriberService.notifySubscriberOnSubscription(email); 
            res.status(201).json(newSubscriber); 

        } catch (error) {
            console.error('Error creating subscriber:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    /**
     * Method to retrieve all subscribers.
     * @param req Request object.
     * @param res Response object to send the subscribers.
     */
    public async getAllSubscribers(req: Request, res: Response): Promise<void> {
        try {
            const subscribers = await SubscriberModel.getAllSubscribers();
            res.status(200).json(subscribers);
        } catch (error) {
            console.error('Error fetching subscribers:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    /**
     * Method to retrieve a subscriber by its ID.
     * @param req Request object containing the subscriber ID.
     * @param res Response object to send the subscriber.
     */
    public async getSubscriberById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const subscriber = await SubscriberModel.findSubscriberById(id);
            if (subscriber) {
                res.status(200).json(subscriber);
            } else {
                res.status(404).send('Subscriber not found');
            }
        } catch (error) {
            console.error('Error fetching subscriber by ID:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    /**
     * Method to update a subscriber by its ID.
     * @param req Request object containing the subscriber ID and updated data.
     * @param res Response object to send the updated subscriber.
     */
    public async updateSubscriber(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const updatedSubscriberData = req.body;
            const updatedSubscriber = await SubscriberModel.updateSubscriber(id, updatedSubscriberData);
            if (updatedSubscriber) {
                res.status(200).json(updatedSubscriber);
            } else {
                res.status(404).send('Subscriber not found');
            }
        } catch (error) {
            console.error('Error updating subscriber:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    /**
     * Method to delete a subscriber by its ID.
     * @param req Request object containing the subscriber ID.
     * @param res Response object to send the result.
     */
    public async deleteSubscriber(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const deletedSubscriber = await SubscriberModel.deleteSubscriber(id);
            if (deletedSubscriber) {
                res.status(200).send('Subscriber deleted successfully');
            } else {
                res.status(404).send('Subscriber not found');
            }
        } catch (error) {
            console.error('Error deleting subscriber:', error);
            res.status(500).send('Internal Server Error');
        }
    }
}

export default new SubscriberController();
