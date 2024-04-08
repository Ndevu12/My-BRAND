// subscriberServices.ts
// var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
//     function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
//     return new (P || (P = Promise))(function (resolve, reject) {
//         function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
//         function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
//         function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
//         step((generator = generator.apply(thisArg, _arguments || [])).next());
//     });
// };
import sendNotificationByEmail from '../utils/notificationUtility.js'; // const the Notification Utility
import SubscriberModel from '../models/Subscriber.js';


// Service to handle subscriber operations
class SubscriberServices {
    // Service method to notify a subscriber about successful subscription
    async notifySubscriberOnSubscription(subscriberEmail) {
            try {
                const message = 'You have subscribed to NdevuSpace.com successfully! Thank you for subscribing.'; // Notification message
                await sendNotificationByEmail(subscriberEmail, 'Subscribed to NdevuSpace.com Successfully', message);
            }
            catch (error) {
                console.error('Error notifying subscriber on subscription:', error);
                throw new Error('Failed to notify subscriber on subscription');
            }
    }

    // Service method to notify all subscribers about updates
    async notifyAllSubscribersAboutUpdates(blogTitle, message) {
            try {
                const subscribers = await SubscriberModel.getAllSubscribers(); // Fetch all subscribers
                for (const subscriber of subscribers) {
                    await sendNotificationByEmail(subscriber.email, blogTitle, message);
                }
            }
            catch (error) {
                console.error('Error notifying all subscribers about updates:', error);
                throw new Error('Failed to notify all subscribers about updates');
            }
    }
}
export default SubscriberServices;
