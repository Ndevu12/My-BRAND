/**
 * This file deals with blogs storing and handlings.
 */
// var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
//     function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
//     return new (P || (P = Promise))(function (resolve, reject) {
//         function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
//         function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
//         function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
//         step((generator = generator.apply(thisArg, _arguments || [])).next());
//     });
// };
import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;
/**
 * Class representing the Blog model
 */
class BlogModel {
    constructor() {
        const blogSchema = new Schema({
            title: {
                type: String,
                required: true,
            },
            content: {
                type: String,
                required: true,
            },
            author: {
                type: Schema.ObjectId,
                ref: "Author", 
                required: true
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
                type: Schema.ObjectId,
                ref: "BlogCategory", 
                required: true
            },
            tags: [{
                    type: String,
                }],
        });

        // Virtual for this BLOG instance URL.
        blogSchema.virtual("url").get(function () {
            return "/blogRoutes/blog/" + this._id;
            });

        this.model = model('Blog', blogSchema);
    }
    /**
 * Function to return the current date and time.
 * @returns {Date} Current date and time.
 */
    async getCurrentDate() {
        return new Date();
    }
    // Method to create a new blog document
    async createBlog(data) {
        return await this.model.create(data);
    }
    // Method to find a blog document by ID
    async findBlogById(id) {
        return await his.model.findById(id).exec();
    }
    // Method to update a blog document
    async updateBlog(id, data) {
        return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    // Method to delete a blog document
    async deleteBlog(id) {
        return await this.model.findByIdAndDelete(id).exec();
    }
    /**
   * Method to find all blog documents.
   * @returns Promise resolving to an array of all blog documents.
   */
    async findAllBlogs() {
            return await this.model.find().exec();
    }
    /**
     * Method to find blog documents by category.
     * @param category The category to filter blogs by.
     * @returns Promise resolving to an array of blog documents matching the category.
     */
    async findBlogsByCategory(category) {
            return await this.model.find({ category }).exec();
    }
}
export default BlogModel;
