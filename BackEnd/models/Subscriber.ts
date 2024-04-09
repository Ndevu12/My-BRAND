import mongoose, { Schema, Document } from 'mongoose';

/**
 *  Define the interface for the Subscriber document
 */
export interface ISubscriber extends Document {
    full_name: string;
    email: string;
    location: string;
    preference: string;
    subscribe_at: Date;
}

/**
 *  Define the Subscriber schema using a class
 */
class SubscriberModel {
    private readonly model: mongoose.Model<ISubscriber>;

    constructor() {
       const SubscriberSchema = new  Schema<ISubscriber>({
            full_name: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                required: true,
                unique: true,
            },
            location: {
                type: String,
                required: true,
            },
            preference: {
                type: String,
                required: true,
            },
            subscribe_at: {
                type: Date,
                default: Date.now,
            },
        });
        this.model = mongoose.model<ISubscriber>('Subscriber', SubscriberSchema);
    }

     /**
     * Method to create a new Subscriber document.
     * @param data Partial Subscriber data to create.
     * @returns Promise resolving to the created Subscriber document.
     */
     public createSubscriber(data: Partial<ISubscriber>): Promise<ISubscriber> {
        return this.model.create(data);
    }

    /**
     * Method to find an Subscriber document by ID.
     * @param id Subscriber ID.
     * @returns Promise resolving to the found Subscriber document, or null if not found.
     */
    public findSubscriberById(id: string): Promise<ISubscriber | null> {
        return this.model.findById(id).exec();
    }

    public findSubscriberByEmail(data: Partial<ISubscriber>): Promise<ISubscriber | null> {
        return this.model.findOne({ email: data.email }).exec();
      }
      

    /**
     * Method to update an Subscriber document.
     * @param id Subscriber ID to update.
     * @param data Partial Subscriber data to update.
     * @returns Promise resolving to the updated Subscriber document, or null if not found.
     */
    public updateSubscriber(id: string, data: Partial<ISubscriber>): Promise<ISubscriber | null> {
        return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    /**
     * Method to delete an Subscriber document.
     * @param id Subscriber ID to delete.
     * @returns Promise resolving to the deleted Subscriber document, or null if not found.
     */
    public deleteSubscriber(id: string): Promise<ISubscriber | null> {
        return this.model.findByIdAndDelete(id).exec();
    }

          /**
     * Method to find all Subscriber documents.
     * @returns Promise resolving to an array of all Subscriber documents.
     */
          public async getAllSubscribers(): Promise<ISubscriber[]> {
            return this.model.find().exec();
        }

}

// Create the Subscriber model
// const SubscriberModel = mongoose.model<ISubscriber>('Subscriber', new SubscriberSchema());

export default new SubscriberModel();
