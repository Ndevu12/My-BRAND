
import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

class blogCategory {
    constructor() {
        /*d:\vs code\BIENVENUE\src\style d:\vs code\BIENVENUE\src\pages d:\vs code\BIENVENUE\src\scriptd:\vs code\BIENVENUE\src\style d:\vs code\BIENVENUE\src\pages d:\vs code\BIENVENUE\src\script*
         * Mongoose schema for the Categories collection.
         */
        const categorySchema = new Schema({
            name: {
                type: String,
                required: true,
                unique: true // Ensures each category name is unique
            }
        });

        // Virtual for this about instance URL.
        categorySchema.virtual("url").get(function () {
            return "/blog/category/" + this._id;
            });
        this.model = model('BlogCategory', categorySchema);
    }
    /**
     * Method to create a new Category document.
     * @param data Partial Category data to create.
     * @returns Promise resolving to the created Category document.
     */
    async createBlogCategory(data) {
        return await this.model.create(data);
    }
    /**
     * Method to find a Category document by ID.
     * @param id Category ID.
     * @returns Promise resolving to the found Category document, or null if not found.
     */
    async findBlogCategoryById(id) {
        return await this.model.findById(id).exec();
    }
    /**
     * Method to update a Category document.
     * @param id Category ID to update.
     * @param data Partial Category data to update.
     * @returns Promise resolving to the updated Category document, or null if not found.
     */
    async updateBlogCategory(id, data) {
        return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    /**
     * Method to delete a Category document.
     * @param id Category ID to delete.
     * @returns Promise resolving to the deleted Category document, or null if not found.
     */
    async deleteBlogCategory(id) {
        return await this.model.findByIdAndDelete(id).exec();
    }
    async getAllBlogCategories() {
        return await this.model.find().exec();
    }
}
/**
 * Category Model.
 * @typedef Category
 */
export default blogCategory;
