/**
 * Controller for handling Service-related operations.
 */
import { Request, Response } from 'express';
import ServiceModel, { IService } from '../models/Service';

class ServiceController {
    /**
     * Method to create a new service.
     * @param req Request object containing service data.
     * @param res Response object to send the result.
     */
    public async createService(req: Request, res: Response): Promise<void> {
        try {
            const serviceData: Partial<IService> = req.body;
            const newService = await ServiceModel.createService(serviceData);
            res.status(201).json(newService);
        } catch (error) {
            console.error('Error creating service:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    /**
     * Method to retrieve all services.
     * @param req Request object.
     * @param res Response object to send the services.
     */
    public async getAllServices(req: Request, res: Response): Promise<void> {
        try {
            const services = await ServiceModel.getAllServices();
            res.status(200).json(services);
        } catch (error) {
            console.error('Error fetching services:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    /**
     * Method to retrieve a service by its ID.
     * @param req Request object containing the service ID.
     * @param res Response object to send the service.
     */
    public async getServiceById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const service = await ServiceModel.findServiceById(id);
            if (service) {
                res.status(200).json(service);
            } else {
                res.status(404).json({ error: 'Service not found' });
            }
        } catch (error) {
            console.error('Error fetching service by ID:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    /**
     * Method to update a service by its ID.
     * @param req Request object containing the service ID and updated data.
     * @param res Response object to send the updated service.
     */
    public async updateService(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const updatedServiceData = req.body;
            const updatedService = await ServiceModel.updateService(id, updatedServiceData);
            if (updatedService) {
                res.status(200).json(updatedService);
            } else {
                res.status(404).json({ error: 'Service not found' });
            }
        } catch (error) {
            console.error('Error updating service:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    /**
     * Method to delete a service by its ID.
     * @param req Request object containing the service ID.
     * @param res Response object to send the result.
     */
    public async deleteService(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const deletedService = await ServiceModel.deleteService(id);
            if (deletedService) {
                res.status(200).json({ message: 'Service deleted successfully' });
            } else {
                res.status(404).json({ error: 'Service not found' });
            }
        } catch (error) {
            console.error('Error deleting service:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default new ServiceController();
