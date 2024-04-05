// const necessary modules
import { Router } from 'express';
import MessageController from '../controllers/MessageController.js';

// Create a router instance
const router = Router();

const MessageCont = new MessageController();

// Define routes
router.post('/Message/:id/createMessage', MessageCont.createMessage);
router.put('/Message/:id/updateMessage', MessageCont.updateMessage);
router.get('/Message/:id/getMessageById', MessageCont.getMessageById);
router.get('/Message/getAllMessages', MessageCont.getAllMessages);
router.delete('/Message/:id/deleteMessage', MessageCont.deleteMessage);

// Export the router
export default router;
