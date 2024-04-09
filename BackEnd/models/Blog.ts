/**
 * This file deals with blogs storing and handlings.
 */

import mongoose, { Schema, Document } from 'mongoose';

/**
 *  Interface representing the structure of a blog document.
 */
export interface IBlog extends Document {
    title: string;
    content: string;
    author: string;
    createdAt?: Date;
    updatedAt?: Date;
    comments: string[]; // Array of comments IDs
    category: string;
    tags: string[]; // Array of tags
}

/**
 * Class representing the Blog model
 */


class BlogModel {
    private readonly model: mongoose.Model<IBlog>;

    constructor() {
        const blogSchema = new Schema<IBlog>({
            title: {
                type: String,
                required: true,
            },
            content: {
                type: String,
                required: true,
            },
            author: {
                type: String,
                required: true,
            },
            createdAt: {
                type: Date,
                default: this.getCurrentDate,
            },
            updatedAt: {
                type: Date,
                default: this.getCurrentDate,
            },
            comments: [{
                type: Schema.Types.ObjectId,
                ref: 'Comment', // Reference to the comment model
            }],
            category: {
                type: String,
                required: true,
            },
            tags: [{ 
                type: String,
            }],
        });

        this.model = mongoose.model<IBlog>('Blog', blogSchema);
    }

    /**
 * Function to return the current date and time.
 * @returns {Date} Current date and time.
 */
    private getCurrentDate(): Date {
        return new Date();
    }

    // Method to create a new blog document
    public createBlog(data: Partial<IBlog>): Promise<IBlog> {
        return this.model.create(data);
    }

    // Method to find a blog document by ID
    public findBlogById(id: string): Promise<IBlog | null> {
        return this.model.findById(id).exec();
    }

    // Method to update a blog document
    public updateBlog(id: string, data: Partial<IBlog>): Promise<IBlog | null> {
        return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    // Method to delete a blog document
    public deleteBlog(id: string): Promise<IBlog | null> {
        return this.model.findByIdAndDelete(id).exec();
    }

      /**
     * Method to find all blog documents.
     * @returns Promise resolving to an array of all blog documents.
     */
      public async findAllBlogs(): Promise<IBlog[]> {
        return this.model.find().exec();
    }

    /**
     * Method to find blog documents by category.
     * @param category The category to filter blogs by.
     * @returns Promise resolving to an array of blog documents matching the category.
     */
    public async findBlogsByCategory(category: string): Promise<IBlog[]> {
        return this.model.find({ category }).exec();
    }
}

export default new BlogModel();
