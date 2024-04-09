// var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
//     function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
//     return new (P || (P = Promise))(function (resolve, reject) {
//         function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
//         function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
//         function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
//         step((generator = generator.apply(thisArg, _arguments || [])).next());
//     });
// };

import licenseAndCertificateModel from '../models/lisenceAndCertificate.js';

// hijokl
class LicenseCertificateController {
    /**
 * Method to create a new License and Certificate.
 * @param req Request object containing License and Certificate data.
 * @param res Response object to send the result.
 */
    async createLicenseCertificate(req, res) {
            try {
                const licenseCertificateData = req.body;
                const newLicenseCertificate = await licenseAndCertificateModel.createLicenseAndCertificate(licenseCertificateData);
                res.status(201).json(newLicenseCertificate);
            }
            catch (error) {
                console.error('Error creating License and Certificate:', error);
                res.status(500).send('Internal Server Error');
            }
    }
    /**
  * Method to retrieve a License and Certificate by its ID.
  * @param req Request object containing the License and Certificate ID.
  * @param res Response object to send the License and Certificate.
  */
    async findLicenseAndCertificateById(req, res) {
            try {
                const { id } = req.params;
                const licenseAndCertificate = await licenseAndCertificateModel.findLicenseAndCertificate(id);
                if (!licenseAndCertificate) {
                    res.status(404).send('License OR CERTIFICATE not found');
                    return;
                }
                res.json(licenseAndCertificate);
            }
            catch (error) {
                console.error('Error fetching license and certificate by ID:', error);
                res.status(500).send('Internal server Error');
            }
    }
    /**
    * Method to update a License and Certificate by its ID.
    * @param req Request object containing the License and Certificate ID and updated data.
    * @param res Response object to send the updated License and Certificate.
    */
    async updateLicenseCertificate(req, res) {
            try {
                const { id } = req.params;
                const updatedData = req.body;
                const updatedLicenseCertificate = await licenseAndCertificateModel.updateLicenseAndCertificate(id, updatedData);
                if (updatedLicenseCertificate) {
                    updatedLicenseCertificate.save();
                    res.status(200).json(updatedLicenseCertificate);
                }
                else {
                    res.status(404).json({ error: 'License and Certificate not found' });
                }
            }
            catch (error) {
                console.error('Error updating License and Certificate:', error);
                res.status(500).send('Internal Server Error');
            }
    }
    /**
    * Method to delete a License and Certificate by its ID.
    * @param req Request object containing the License and Certificate ID.
    * @param res Response object to send the result.
    */
    async deleteLicenseCertificate(req, res) {
            try {
                const { id } = req.params;
                const deletedLicenseCertificate = await licenseAndCertificateModel.deleteLicenseAndCertificate(id);
                if (deletedLicenseCertificate) {
                    res.status(200).json({ message: 'License and Certificate deleted successfully' });
                }
                else {
                    res.status(404).json({ error: 'License and Certificate not found' });
                }
            }
            catch (error) {
                console.error('Error deleting License and Certificate:', error);
                res.status(500).send('Internal Server Error');
            }
    }
    /**
* Method to retrieve all License and Certificates.
* @param req Request object.
* @param res Response object to send the License and Certificates.
*/
    async getAllLicenseCertificates(req, res) {
            try {
                const licenseAndCertificate = await licenseAndCertificateModel.getAllLicenseAndCertificate();
                res.status(200).json(licenseAndCertificate);
            }
            catch (error) {
                console.error("Error fetching License and Certificate:", error);
                res.status(500).send({ error: 'Internal Server Error' });
            }
    }
}
export default LicenseCertificateController;
