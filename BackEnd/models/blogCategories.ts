import mongoose, { Document, Schema } from 'mongoose';

/**
 * Interface representing the structure of a category document.
 */
export interface ICategory extends Document {
    name: string; // The name of the category
}

class blogCategory {
    private readonly model: mongoose.Model<ICategory>;

    constructor(){
        /**
         * Mongoose schema for the Categories collection.
         */
        const categorySchema = new Schema<ICategory>({
            name: {
                type: String,
                required: true,
                unique: true // Ensures each category name is unique
            }
        });
        this.model = mongoose.model<ICategory>('Category', categorySchema);
    }
    
    
    /**
     * Method to create a new Category document.
     * @param data Partial Category data to create.
     * @returns Promise resolving to the created Category document.
     */
    public createBlogCategory(data: Partial<ICategory>): Promise<ICategory> {
        return this.model.create(data);
    }

    /**
     * Method to find a Category document by ID.
     * @param id Category ID.
     * @returns Promise resolving to the found Category document, or null if not found.
     */
    public findBlogCategoryById(id: string): Promise<ICategory | null> {
        return this.model.findById(id).exec();
    }

    /**
     * Method to update a Category document.
     * @param id Category ID to update.
     * @param data Partial Category data to update.
     * @returns Promise resolving to the updated Category document, or null if not found.
     */
    public updateBlogCategory(id: string, data: Partial<ICategory>): Promise<ICategory | null> {
        return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    /**
     * Method to delete a Category document.
     * @param id Category ID to delete.
     * @returns Promise resolving to the deleted Category document, or null if not found.
     */
    public deleteBlogCategory(id: string): Promise<ICategory | null> {
        return this.model.findByIdAndDelete(id).exec();
    }

    public getAllBlogCategories(): Promise<ICategory[]>{
        return this.model.find().exec();
    }

}
/**
 * Category Model.
 * @typedef Category
 */


export default new blogCategory();
