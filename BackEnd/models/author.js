/**
 * This file handles the Author collection.
 */
import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;
/**
 * Class representing the Author model.
 */
class AuthorModel {
    constructor() {
        const authorSchema = new Schema({
            name: {
                type: String,
                required: true,
            },
            postId: {
                type: Schema.ObjectId,
                ref: "Blog", 
                required: true
            },
            createdAt: {
                type: Date,
                required: true,
            },
        });

        this.model = model('Author', authorSchema);
    }
    /**
     * Method to create a new author document.
     * @param data - Data for the new author.
     * @returns Promise resolving to the created author document.
     */
    async createAuthor(data) {
        const newAuthor = await this.model.create(data);
        newAuthor.save();
        return newAuthor;
    }
    /**
     * Method to find an author document by ID.
     * @param id - ID of the author to find.
     * @returns Promise resolving to the found author document or null if not found.
     */
    async findAuthorById(id) {
        return await this.model.findById(id).exec();
    }
    async updateAuthor(id, data) {
        return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    /**
     * Method to delete an Author document.
     * @param id Author ID to delete.
     * @returns Promise resolving to the deleted Author document, or null if not found.
     */
    async deleteAuthor(id) {
        return await this.model.findByIdAndDelete(id).exec();
    }
    async getAllAuthors() {
        return await this.model.find().exec();
    }
}
export default  AuthorModel;
