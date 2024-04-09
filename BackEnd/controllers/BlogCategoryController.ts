/**
 * Controller for handling Blog Category-related operations.
 */
import { Request, Response } from 'express';
import blogCategory, { ICategory } from '../models/blogCategories';

class BlogCategoryController {
    /**
     * Method to create a new blog category.
     * @param req Request object containing blog category data.
     * @param res Response object to send the result.
     */
    public async createBlogCategory(req: Request, res: Response): Promise<void> {
        try {
            const categoryData: Partial<ICategory> = req.body;
            const newCategory = await blogCategory.createBlogCategory(categoryData);
            res.status(201).json(newCategory);
        } catch (error) {
            console.error('Error creating blog category:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    /**
     * Method to retrieve all blog categories.
     * @param req Request object.
     * @param res Response object to send the blog categories.
     */
    public async getAllBlogCategories(req: Request, res: Response): Promise<void> {
        try {
            const categories = await blogCategory.getAllBlogCategories();
            res.status(200).json(categories);
        } catch (error) {
            console.error('Error fetching blog categories:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    /**
     * Method to retrieve a blog category by its ID.
     * @param req Request object containing the category ID.
     * @param res Response object to send the category.
     */
    public async getBlogCategoryById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const category = await blogCategory.findBlogCategoryById(id);
            if (category) {
                res.status(200).json(category);
            } else {
                res.status(404).json({ error: 'Blog category not found' });
            }
        } catch (error) {
            console.error('Error fetching blog category by ID:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    /**
     * Method to update a blog category by its ID.
     * @param req Request object containing the category ID and updated data.
     * @param res Response object to send the updated category.
     */
    public async updateBlogCategory(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const updatedCategoryData = req.body;
            const updatedCategory = await blogCategory.updateBlogCategory(id, updatedCategoryData);
            if (updatedCategory) {
                res.status(200).json(updatedCategory);
            } else {
                res.status(404).json({ error: 'Blog category not found' });
            }
        } catch (error) {
            console.error('Error updating blog category:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    /**
     * Method to delete a blog category by its ID.
     * @param req Request object containing the category ID.
     * @param res Response object to send the result.
     */
    public async deleteBlogCategory(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const deletedCategory = await blogCategory.deleteBlogCategory(id);
            if (deletedCategory) {
                res.status(200).json({ message: 'Blog category deleted successfully' });
            } else {
                res.status(404).json({ error: 'Blog category not found' });
            }
        } catch (error) {
            console.error('Error deleting blog category:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default new BlogCategoryController();
