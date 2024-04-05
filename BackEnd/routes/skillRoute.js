// const necessary modules
import { Router } from 'express';
import skillController from '../controllers/skillController.js';

// Create a router instance
const router = Router();

const skillCont = new skillController();

// Define routes
router.post('/skill/:id/createSkill', skillCont.createSkill);
router.put('/skill/:id/updateSkill', skillCont.updateSkill);
router.get('/skill/:id/getSkillById', skillCont.getSkillById);
router.get('/skill/getAllSkills', skillCont.getAllSkills);
router.delete('/skill/:id/deleteSkill', skillCont.deleteSkill);

// Export the router
export default router;
