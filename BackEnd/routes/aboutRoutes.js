
import express from 'express';
import  aboutController from '../controllers/AboutController.js';

const aboutRouter = express.Router();

const aboutCont = new aboutController();

// Route to create a new about
aboutRouter.post('/abaut/create', aboutCont.createAbouting,);

// Route to get all about entries
aboutRouter.get('/AllAbout', aboutCont.getAllAbout);

// Route to get a specific about entry by ID
aboutRouter.get('/abaut/:id/getAboutById', aboutCont.getAboutById);

// Route to update an existing about entry
aboutRouter.put('/abaut/:id/updateAbout', aboutCont.updateAbout);

// Route to delete an existing about entry
aboutRouter.delete('/abaut/:id/deleteAbout', aboutCont.deleteAbout);

// hijokl
export default aboutRouter;
