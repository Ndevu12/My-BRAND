// var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
//     function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
//     return new (P || (P = Promise))(function (resolve, reject) {
//         function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
//         function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
//         function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
//         step((generator = generator.apply(thisArg, _arguments || [])).next());
//     });
// };

import commentsModel from '../models/comments.js';

class CommentController {
    // hijokl
    /**
     * Method to create a new comment.
     * @param req Request object containing comment data.
     * @param res Response object to send the result.
     */
    async createComment(req, res) {
            try {
                const commentData = req.body;
                const newComment = await commentsModel.createComment(commentData);
                newComment.save();
                res.status(201).json(newComment);
            }
            catch (error) {
                console.error('Error creating comment:', error);
                res.status(500).send('Internal Server Error');
            }
    }
    /**
     * Method to retrieve all comments.
     * @param req Request object.
     * @param res Response object to send the comments.
     */
    async getAllComments(req, res) {
            try {
                const comments = await commentsModel.getAllComments();
                res.status(200).json(comments);
            }
            catch (error) {
                console.error('Error fetching comments:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
    }
    /**
     * Method to retrieve a comment by its ID.
     * @param req Request object containing the comment ID.
     * @param res Response object to send the comment.
     */
    async getCommentById(req, res) {
            try {
                const { id } = req.params;
                const comment = await commentsModel.findCommentById(id);
                if (comment) {
                    res.status(200).json(comment);
                }
                else {
                    res.status(404).json({ error: 'Comment not found' });
                }
            }
            catch (error) {
                console.error('Error fetching comment by ID:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
    }
    /**
  * Method to retrieve a comment by post ID.
  * @param req Request object containing the comment ID.
  * @param res Response object to send the comment.
  */
    async findCommentByPostID(req, res) {
            try {
                const { post_ID } = req.params;
                const comment = await commentsModel.findCommentByPostID(post_ID);
                if (comment) {
                    res.status(200).json(comment);
                }
                else {
                    res.status(404).json({ error: 'comment not found' });
                }
            }
            catch (error) {
                console.error('Error fetching comment by post ID:', error);
                res.status(500).json({ error: 'Internal server Error' });
            }
    }
    /**
     * Method to update a comment by its ID.
     * @param req Request object containing the comment ID and updated data.
     * @param res Response object to send the updated comment.
     */
    async updateComment(req, res) {
            try {
                const { id } = req.params;
                const updatedCommentData = req.body;
                const updatedComment = await commentsModel.updateComment(id, updatedCommentData);
                
                if (updatedComment) {
                    updatedComment.save();
                    res.status(200).json(updatedComment);
                }
                else {
                    res.status(404).json({ error: 'Comment not found' });
                }
            }
            catch (error) {
                console.error('Error: unable to update comment:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
    }
    /**
     * Method to delete a comment by its ID.
     * @param req Request object containing the comment ID.
     * @param res Response object to send the result.
     */
    async deleteComment(req, res) {
            try {
                const { id } = req.params;
                const deletedComment = await commentsModel.deleteComment(id);
                if (deletedComment) {
                    res.status(200).json({ message: 'Comment deleted successfully' });
                }
                else {
                    res.status(404).json({ error: 'Comment not found' });
                }
            }
            catch (error) {
                console.error('Error deleting comment:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
    }
}
export default CommentController;
