/**
 * This file deals with storing and handling Internship information.
 */


import mongoose, {Schema, Document} from "mongoose";

/**
 * Interface representing the structure of an Internship document.
 */

export interface IInternship extends Document {
    title: string;
    content: string;
    company: string;
    duration: string;
    compilationDate: Date;
    certificate: string;
}


/**
 * Class representing the Internship model.
 */

class InternshipModel {
    private readonly model: mongoose.Model<IInternship>;

    constructor(){
        const InternshipSchema = new Schema<IInternship>({
            title: {
                type: String,
                required: true,
            },

            content: {
                type: String,
                required: true,
            },
            company: {
                type: String,
                required: true,
            },
            duration: {
                type: String,
                required: true,
            },
            compilationDate: {
                type: Date,
                required: true,
            },
            certificate: {
                type: String,
                required: true,
            },
        });

        this.model = mongoose.model<IInternship>('Internship', InternshipSchema);
    }

      /**
     * Method to create a new Internship document.
     * @param data Partial Internship data to create.
     * @returns Promise resolving to the created Internship document.
     */
    public createInternship(data: Partial<IInternship>): Promise<IInternship>{
        return this.model.create(data);
    }

    /**
     * Method to find an Internship document by ID.
     * @param id Internship ID.
     * @returns Promise resolving to the found Internship document, or null if not found.
     */
    public findInternshipById(id: string): Promise<IInternship | null>{
        return this.model.findById(id).exec();
    }

     /**
     * Method to update an Internship document.
     * @param id Internship ID to update.
     * @param data Partial Internship data to update.
     * @returns Promise resolving to the updated Internship document, or null if not found.
     */
    public updateInternship(id: string, data: Partial<IInternship>): Promise<IInternship | null>{
        return this.model.findByIdAndUpdate(id, data, {new: true}).exec();
    }

      /**
     * Method to delete an Internship document.
     * @param id Internship ID to delete.
     * @returns Promise resolving to the deleted Internship document, or null if not found.
     */
    public deleteInternship(id: string): Promise<IInternship | null>{
        return this.model.findByIdAndDelete(id).exec();
    }

    public getAllInternships(): Promise<IInternship[]>{
        return this.model.find().exec();
    }

   
}

export default new InternshipModel();