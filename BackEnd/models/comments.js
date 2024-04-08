/**
 * This file handles the Comments collection.
 */
import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;
/**
 * Class representing the Comment model.
 */
class CommentModel {
    constructor() {
        const commentSchema = new Schema({
            post_ID: {
                type: Schema.ObjectId,
                ref: "Blog", 
                required: true
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

        this.model = model('Comment', commentSchema);
    }
    // Method to create a new comment
    async createComment(data) {
        return await this.model.create(data);
    }
    // Method to find a comment by ID
    async findCommentById(id) {
        return await this.model.findById(id).exec();
    }
    async findCommentByPostID(id) {
        return await this.model.findById(id).exec();
    }
    // Method to update a comment
    async updateComment(id, data) {
        return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    // Method to delete a comment by ID
    async deleteComment(id) {
        return await this.model.findByIdAndDelete(id).exec();
    }
    async getAllComments() {
        return await this.model.find().exec();
    }
}
export default CommentModel;
