/**
 * This file handles the Author collection.
 */

import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interface representing the structure of an author document.
 */
export interface IAuthor extends Document {
    name: string;
    postId: string;
    createdAt: Date;
}

/**
 * Class representing the Author model.
 */
class AuthorModel {
    private readonly model: mongoose.Model<IAuthor>;

    constructor() {
        const authorSchema = new Schema<IAuthor>({
            name: {
                type: String,
                required: true,
            },
            postId: {
                type: String,
                required: true,
                unique: true,
            },
            createdAt: {
                type: Date,
                required: true,
            },
        });

        this.model = mongoose.model<IAuthor>('Author', authorSchema);
    }

    /**
     * Method to create a new author document.
     * @param data - Data for the new author.
     * @returns Promise resolving to the created author document.
     */
    public createAuthor(data: Partial<IAuthor>): Promise<IAuthor> {
        return this.model.create(data);
    }

    /**
     * Method to find an author document by ID.
     * @param id - ID of the author to find.
     * @returns Promise resolving to the found author document or null if not found.
     */
    public findAuthorById(id: string): Promise<IAuthor | null> {
        return this.model.findById(id).exec();
    }

    public updateAuthor(id: string, data: Partial<IAuthor>): Promise<IAuthor | null> {
        return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    /**
     * Method to delete an Author document.
     * @param id Author ID to delete.
     * @returns Promise resolving to the deleted Author document, or null if not found.
     */
    public deleteAuthor(id: string): Promise<IAuthor | null> {
        return this.model.findByIdAndDelete(id).exec();
    }

    public getAllAuthors(): Promise<IAuthor[]> {
        return this.model.find().exec();
    }

   
}

export default new AuthorModel();
