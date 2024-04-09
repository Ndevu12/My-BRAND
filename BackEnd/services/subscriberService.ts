// subscriberServices.ts

import { sendNotificationByEmail } from '../utils/notificationUtility'; // Import the Notification Utility
import SubscriberModel, { ISubscriber } from '../models/Subscriber';

// Service to handle subscriber operations
class SubscriberServices {
    // Service method to notify a subscriber about successful subscription
    public async notifySubscriberOnSubscription(subscriberEmail: string): Promise<void> {
        try {
            const message = 'You have subscribed NdevuSpace.com successfully! Thank you for subscribing.'; // Notification message
            await sendNotificationByEmail(subscriberEmail, 'Subscribed to NdevuSpace.com Successfully', message);
        } catch (error) {
            console.error('Error notifying subscriber on subscription:', error);
            throw new Error('Failed to notify subscriber on subscription');
        }
    }

    // Service method to notify all subscribers about updates
    public async notifyAllSubscribersAboutUpdates(blogTitle: string, message: string): Promise<void> {
        try {
            const subscribers = await SubscriberModel.getAllSubscribers(); // Fetch all subscribers
            for (const subscriber of subscribers) {
                await sendNotificationByEmail(subscriber.email, blogTitle, message);
            }
        } catch (error) {
            console.error('Error notifying all subscribers about updates:', error);
            throw new Error('Failed to notify all subscribers about updates');
        }
    }
}

export default new SubscriberServices();
