// const necessary modules
import express from 'express';
import AuthorController from '../controllers/AuthorController.js';

// Create a router instance
const router = express.Router();

const authController = new AuthorController()

// Define routes
router.post('/Author/:id/createAuthor', authController.createAuthor);
router.put('/Author/:id/updateAuthor', authController.updateAuthor);
router.get('/Author/:id/getAuthorById', authController.getAuthorById);
router.get('/Author/getAllAuthors', authController.getAllAuthors);
router.delete('/Author/:id/deleteAuthor', authController.deleteAuthor);

// Export the router
export default router;
