/**
 * This file handles the Comments collection.
 */

import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interface representing the structure of a comment document.
 */
export interface IComment extends Document {
    post_ID: string; // ID of the post the comment belongs to
    commenterName: string;
    comment: string;
    createdAt?: Date;
}

/**
 * Class representing the Comment model.
 */
class CommentModel {
    private readonly model: mongoose.Model<IComment>;

    constructor() {
        const commentSchema = new Schema<IComment>({
            post_ID: {
                type: String,
                required: true,
            },
            commenterName: {
                type: String,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        });

        this.model = mongoose.model<IComment>('Comment', commentSchema);
    }

    // Method to create a new comment
    public createComment(data: Partial<IComment>): Promise<IComment> {
        return this.model.create(data);
    }

    // Method to find a comment by ID
    public findCommentById(id: string): Promise<IComment | null> {
        return this.model.findById(id).exec();
    }

    public findCommentByPostID(id: string): Promise<IComment | null> {
        return this.model.findById(id).exec();
    }


    // Method to update a comment
    public updateComment(id: string, data: Partial<IComment>): Promise<IComment | null> {
        return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    // Method to delete a comment by ID
    public deleteComment(id: string): Promise<IComment | null> {
        return this.model.findByIdAndDelete(id).exec();
    }

    public getAllComments(): Promise<IComment[]> {
        return this.model.find().exec();
    }

}

export default new CommentModel();
