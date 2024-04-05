// const necessary modules
import { Router } from 'express';
import BlogController from '../controllers/blogController.js';

// Create a router instance
const router = Router();

const BlogCont = new BlogController();

// Define routes

router.post('/Blog/:id/createBlog', BlogCont.createBlog);
router.put('/Blog/:id/updateBlog', BlogCont.updateBlog);
router.get('/Blog/:id/getBlogById', BlogCont.getBlogById);
router.get('/Blog/getAllBlogs', BlogCont.getAllBlogs);
router.delete('/Blog/:id/deleteBlog', BlogCont.deleteBlog);

// Export the router
export default router;
