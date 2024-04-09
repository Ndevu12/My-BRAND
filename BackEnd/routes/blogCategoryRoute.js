// Import necessary modules
import express from 'express';
import BlogCategoryController from '../controllers/BlogCategoryController.js';

// Create a router instance
const router = express.Router();

const blogCategoryCont = new BlogCategoryController();

// Define routes
router.post('/blog/Category/:id/createBlogCategory', blogCategoryCont.createBlogCategory);
router.get('/blog/Category/:id/getBlogCategoryById', blogCategoryCont.getBlogCategoryById);
router.put('/blog/Category/:id/updateBlogCategory', blogCategoryCont.updateBlogCategory);
router.get('/blog/Category/getAllBlogCategories', blogCategoryCont.getAllBlogCategories);
router.delete('/blog/Category/:id/deleteBlogCategory', blogCategoryCont.deleteBlogCategory);

// hijokl
// Export the router
export default router;
