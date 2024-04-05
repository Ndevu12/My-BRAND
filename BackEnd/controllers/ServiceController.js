// var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
//     function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
//     return new (P || (P = Promise))(function (resolve, reject) {
//         function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
//         function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
//         function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
//         step((generator = generator.apply(thisArg, _arguments || [])).next());
//     });
// };

import ServiceModel from '../models/Service.js';

class ServiceController {
    /**
     * Method to create a new service.
     * @param req Request object containing service data.
     * @param res Response object to send the result.
     */
    async createService(req, res) {
            try {
                const serviceData = req.body;
                const newService = await ServiceModel.createService(serviceData);
                res.status(201).json(newService);
            }
            catch (error) {
                console.error('Error creating service:', error);
                res.status(500).send('Internal Server Error');
            }
    }
    /**
     * Method to retrieve all services.
     * @param req Request object.
     * @param res Response object to send the services.
     */
    async getAllServices(req, res) {
            try {
                const services = await ServiceModel.getAllServices();
                res.status(200).json(services);
            }
            catch (error) {
                console.error('Error fetching services:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
    }
    /**
     * Method to retrieve a service by its ID.
     * @param req Request object containing the service ID.
     * @param res Response object to send the service.
     */
    async getServiceById(req, res) {
            try {
                const { id } = req.params;
                const service = await ServiceModel.findServiceById(id);
                if (service) {
                    res.status(200).json(service);
                }
                else {
                    res.status(404).json({ error: 'Service not found' });
                }
            }
            catch (error) {
                console.error('Error fetching service by ID:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
    }
    /**
     * Method to update a service by its ID.
     * @param req Request object containing the service ID and updated data.
     * @param res Response object to send the updated service.
     */
    async updateService(req, res) {
            try {
                const { id } = req.params;
                const updatedServiceData = req.body;
                const updatedService = await ServiceModel.updateService(id, updatedServiceData);
                if (updatedService) {
                    res.status(200).json(updatedService);
                }
                else {
                    res.status(404).json({ error: 'Service not found' });
                }
            }
            catch (error) {
                console.error('Error updating service:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
    }
    /**
     * Method to delete a service by its ID.
     * @param req Request object containing the service ID.
     * @param res Response object to send the result.
     */
    async deleteService(req, res) {
            try {
                const { id } = req.params;
                const deletedService = await ServiceModel.deleteService(id);
                if (deletedService) {
                    res.status(200).json({ message: 'Service deleted successfully' });
                }
                else {
                    res.status(404).json({ error: 'Service not found' });
                }
            }
            catch (error) {
                console.error('Error deleting service:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
    }
}
export default ServiceController;
