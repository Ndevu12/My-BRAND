// var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
//     function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
//     return new (P || (P = Promise))(function (resolve, reject) {
//         function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
//         function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
//         function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
//         step((generator = generator.apply(thisArg, _arguments || [])).next());
//     });
// };

import BlogModel from '../models/Blog.js';
import subscriberService from '../services/subscriberService.js';


// hijokl
/**
 * Controller class responsible for handling blog-related requests.
 */
class BlogController {
    /**
 * Creates a new blog post.
 * @param req The request object.
 * @param res The response object.
 */
    async createBlog(req, res) {
            try {
                const blogData = req.body;
                const { title } = req.body;
                const newBlog = await BlogModel.createBlog(blogData);
                newBlog.save();
                /**
                 * Notify subscribers about the  new updates
                 */
                await subscriberService.notifyAllSubscribersAboutUpdates(title, "New blog is available now on NdevuSpace.com");
                res.status(201).json(newBlog);
            }
            catch (error) {
                console.error('Error creating blog:', error);
                res.status(500).send('Internal Server Error');
            }
    }
    /**
     * Retrieves a specific blog post by ID.
     * @param req The request object.
     * @param res The response object.
     */
    async getBlogById(req, res) {
            try {
                const { id } = req.params;
                const blog = await BlogModel.findBlogById(id);
                if (!blog) {
                    res.status(404).send('Blog not found');
                    return;
                }
                res.json(blog);
            }
            catch (error) {
                console.error('Error fetching blog by ID:', error);
                res.status(500).send('Internal Server Error');
            }
    }
    /**
    * Updates a specific blog post.
    * @param req The request object.
    * @param res The response object.
    */
    async updateBlog(req, res) {
            try {
                const { id } = req.params;
                const { title } = req.body;
                const updatedBlogData = req.body;
                const updatedBlog = await BlogModel.updateBlog(id, updatedBlogData);
                updatedBlog.save();

                if (!updatedBlog) {
                    res.status(404).send('Blog not found');
                    return;
                }
                /**
                 * Notify subscribers about the  new updates
                 */
                await subscriberService.notifyAllSubscribersAboutUpdates(title, "Blog has been updated");
                res.json(updatedBlog);
            }
            catch (error) {
                console.error('Error while trying to update a blog', error);
                res.status(500).send('Internal Server Error');
            }
    }
    /**
    * Deletes a specific blog post.
    * @param req The request object.
    * @param res The response object.
    */
    async deleteBlog(req, res) {
            try {
                const { id } = req.params;
                const deletedBlog = await BlogModel.deleteBlog(id);
                if (!deletedBlog) {
                    res.status(404).send('Blog not found');
                    return;
                }
                res.json(deletedBlog);
            }
            catch (error) {
                console.error('Error deleting blog:', error);
                res.status(500).send('Internal Server Error');
            }
    }
    /**
    * Method to find blog documents by category.
    * @param category The category to filter blogs by.
    * @returns Promise resolving to an array of blog documents matching the category.
    */
    async getBlogsByCategory(req, res) {
            try {
                const { category } = req.params;
                const blogs = await BlogModel.findBlogsByCategory(category);
                res.json(blogs);
            }
            catch (error) {
                console.error('Error fetching blogs by category:', error);
                res.status(500).send('Internal Server Error');
            }
    }
    /**
    * Method to find all blog documents.
    * @returns Promise resolving to an array of all blog documents.
    */
    async getAllBlogs(req, res) {
            try {
                const blogs = await BlogModel.findAllBlogs(); // Call the findAllBlogs method
                res.status(200).json(blogs);
            }
            catch (error) {
                res.status(500).json({ message: 'Internal server error' });
            }
    }
}
export default BlogController;
