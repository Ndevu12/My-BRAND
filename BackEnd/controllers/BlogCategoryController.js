// var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
//     function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
//     return new (P || (P = Promise))(function (resolve, reject) {
//         function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
//         function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
//         function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
//         step((generator = generator.apply(thisArg, _arguments || [])).next());
//     });
// };

import BlogCategoryModel from '../models/blogCategories.js';

class BlogCategoryController {
    /**
     * Method to create a new blog category.
     * @param req Request object containing blog category data.
     * @param res Response object to send the result.
     */
    async createBlogCategory(req, res) {
            try {
                const categoryData = req.body;
                const newCategory = await BlogCategoryModel.createBlogCategory(categoryData);
                newCategory.save();
                res.status(201).json(newCategory);
            }
            catch (error) {
                console.error('Error creating blog category:', error);
                res.status(500).send('Internal Server Error');
            }
    }
    /**
     * Method to retrieve all blog categories.
     * @param req Request object.
     * @param res Response object to send the blog categories.
     */
    async getAllBlogCategories(req, res) {
            try {
                const categories = await BlogCategoryModel.getAllBlogCategories();
                res.status(200).json(categories);
            }
            catch (error) {
                console.error('Error fetching blog categories:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
    }
    // hijokl
    /**
     * Method to retrieve a blog category by its ID.
     * @param req Request object containing the category ID.
     * @param res Response object to send the category.
     */
    async getBlogCategoryById(req, res) {
            try {
                const { id } = req.params;
                const category = await BlogCategoryModel.findBlogCategoryById(id);
                if (category) {
                    res.status(200).json(category);
                }
                else {
                    res.status(404).json({ error: 'Blog category not found' });
                }
            }
            catch (error) {
                console.error('Error fetching blog category by ID:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
    }
    /**
     * Method to update a blog category by its ID.
     * @param req Request object containing the category ID and updated data.
     * @param res Response object to send the updated category.
     */
    async updateBlogCategory(req, res) {
            try {
                const { id } = req.params;
                const updatedCategoryData = req.body;
                const updatedCategory = await BlogCategoryModel.updateBlogCategory(id, updatedCategoryData);
                if (updatedCategory) {
                    updatedCategory.save();
                    res.status(200).json(updatedCategory);
                }
                else {
                    res.status(404).json({ error: 'Blog category not found' });
                }
            }
            catch (error) {
                console.error('Error updating blog category:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
    }
    /**
     * Method to delete a blog category by its ID.
     * @param req Request object containing the category ID.
     * @param res Response object to send the result.
     */
    async deleteBlogCategory(req, res) {
            try {
                const { id } = req.params;
                const deletedCategory = await BlogCategoryModel.deleteBlogCategory(id);
                if (deletedCategory) {
                    res.status(200).json({ message: 'Blog category deleted successfully' });
                }
                else {
                    res.status(404).json({ error: 'Blog category not found' });
                }
            }
            catch (error) {
                console.error('Error deleting blog category:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
    }
}
export default BlogCategoryController;
