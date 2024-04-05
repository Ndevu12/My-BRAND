// const necessary modules
import express from 'express';
import CommentController from '../controllers/CommentController.js';

// Create a router instance
const router = express.Router();

const commentCont = new CommentController();

// Define routes

router.post('/comment/postID/:id/createComment', commentCont.createComment);
router.put('/comment/postID/:id/updateComment', commentCont.updateComment);
router.get('/comment/postID/:id/getCommentById', commentCont.getCommentById);
router.get('/comment/postID/getAllComments', commentCont.getAllComments);
router.delete('/comment/postID/:id/deleteComment', commentCont.deleteComment);

// Export the router
export default router;
