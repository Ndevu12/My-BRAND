/**
 * Controller for handling Project-related operations.
 */
import { Request, Response } from 'express';
import ProjectModel, { IProject } from '../models/Project';

class ProjectController {
    /**
     * Method to create a new project.
     * @param req Request object containing project data.
     * @param res Response object to send the result.
     */
    public async createProject(req: Request, res: Response): Promise<void> {
        try {
            const projectData: Partial<IProject> = req.body;
            const newProject = await ProjectModel.createProject(projectData);
            res.status(201).json(newProject);
        } catch (error) {
            console.error('Error creating project:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    /**
     * Method to retrieve all projects.
     * @param req Request object.
     * @param res Response object to send the projects.
     */
    public async getAllProjects(req: Request, res: Response): Promise<void> {
        try {
            const projects = await ProjectModel.getAllProjects();
            res.status(200).json(projects);
        } catch (error) {
            console.error('Error fetching projects:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    /**
     * Method to retrieve a project by its ID.
     * @param req Request object containing the project ID.
     * @param res Response object to send the project.
     */
    public async getProjectById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const project = await ProjectModel.findProjectById(id);
            if (project) {
                res.status(200).json(project);
            } else {
                res.status(404).json({ error: 'Project not found' });
            }
        } catch (error) {
            console.error('Error fetching project by ID:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    /**
     * Method to update a project by its ID.
     * @param req Request object containing the project ID and updated data.
     * @param res Response object to send the updated project.
     */
    public async updateProject(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const updatedProjectData = req.body;
            const updatedProject = await ProjectModel.updateProject(id, updatedProjectData);
            if (updatedProject) {
                res.status(200).json(updatedProject);
            } else {
                res.status(404).json({ error: 'Project not found' });
            }
        } catch (error) {
            console.error('Error updating project:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    /**
     * Method to delete a project by its ID.
     * @param req Request object containing the project ID.
     * @param res Response object to send the result.
     */
    public async deleteProject(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const deletedProject = await ProjectModel.deleteProject(id);
            if (deletedProject) {
                res.status(200).json({ message: 'Project deleted successfully' });
            } else {
                res.status(404).json({ error: 'Project not found' });
            }
        } catch (error) {
            console.error('Error deleting project:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default new ProjectController();
