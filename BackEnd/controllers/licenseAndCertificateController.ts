/**
 * Controller for handling License and Certificate-related operations.
 */
import { Request, Response } from 'express';
import LicenseCertificateModel, { ILicenseAndCertificate } from '../models/lisenceAndCertificate';

class LicenseCertificateController {
        /**
     * Method to create a new License and Certificate.
     * @param req Request object containing License and Certificate data.
     * @param res Response object to send the result.
     */
    public async createLicenseCertificate(req: Request, res: Response): Promise<void> {
        try {
            const licenseCertificateData: Partial<ILicenseAndCertificate> = req.body;
            const newLicenseCertificate = await LicenseCertificateModel.createLicenseAndCertificate(licenseCertificateData);
            res.status(201).json(newLicenseCertificate);
        } catch (error) {
            console.error('Error creating License and Certificate:', error);
            res.status(500).send('Internal Server Error');
        }
    }


       /**
     * Method to retrieve a License and Certificate by its ID.
     * @param req Request object containing the License and Certificate ID.
     * @param res Response object to send the License and Certificate.
     */
    public async findLicenseAndCertificateById(req: Request, res: Response): Promise<void> {
        try {
            const {id} = req.params;
            const licenseAndCertificate = await LicenseCertificateModel.findLicenseAndCertificate(id);
            if (!licenseAndCertificate){
                res.status(404).send('License OR CERTIFICATE not found');
                return;
            }
            res.json(licenseAndCertificate);
        }catch (error){
            console.error('Error fetching license and certificate by ID:', error);
            res.status(500).send('Internal server Error');
        }
    }

     /**
     * Method to update a License and Certificate by its ID.
     * @param req Request object containing the License and Certificate ID and updated data.
     * @param res Response object to send the updated License and Certificate.
     */
    public async updateLicenseCertificate(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const updatedData: Partial<ILicenseAndCertificate> = req.body;
            const updatedLicenseCertificate = await LicenseCertificateModel.updateLicenseAndCertificate(id, updatedData);
            if (updatedLicenseCertificate) {
                res.status(200).json(updatedLicenseCertificate);
            } else {
                res.status(404).json({ error: 'License and Certificate not found' });
            }
        } catch (error) {
            console.error('Error updating License and Certificate:', error);
            res.status(500).send('Internal Server Error');
        }
    }

     /**
     * Method to delete a License and Certificate by its ID.
     * @param req Request object containing the License and Certificate ID.
     * @param res Response object to send the result.
     */
    public async deleteLicenseCertificate(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const deletedLicenseCertificate = await LicenseCertificateModel.deleteLicenseAndCertificate(id);
            if (deletedLicenseCertificate) {
                res.status(200).json({ message: 'License and Certificate deleted successfully' });
            } else {
                res.status(404).json({ error: 'License and Certificate not found' });
            }
        } catch (error) {
            console.error('Error deleting License and Certificate:', error);
            res.status(500).send('Internal Server Error');
        }
    }

          /**
     * Method to retrieve all License and Certificates.
     * @param req Request object.
     * @param res Response object to send the License and Certificates.
     */

    public async getAllLicenseCertificates(req: Request, res: Response): Promise<void> {

        try{
        const licenseAndCertificate = await LicenseCertificateModel.getAllLicenseAndCertificate();

        res.status(200).json(licenseAndCertificate); 
        }catch(error) {
            console.error("Error fetching License and Certificate:", error);
            res.status(500).send({error:'Internal Server Error'});
        }
    }
}

export default new LicenseCertificateController();
