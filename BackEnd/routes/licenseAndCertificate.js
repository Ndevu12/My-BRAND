// const necessary modules
import { Router } from 'express';
import licenseAndCertificateController from '../controllers/licenseAndCertificateController.js';

// Create a router instance
const router = Router();

const licenseAndCertificateCont = new licenseAndCertificateController();
// Define routes
router.post('/licenseAndCertificate/:id/createLicenseCertificate', licenseAndCertificateCont.createLicenseCertificate);
router.put('/licenseAndCertificate/:id/updateLicenseCertificate', licenseAndCertificateCont.updateLicenseCertificate);
router.get('/licenseAndCertificate/:id/findLicenseAndCertificateById', licenseAndCertificateCont.findLicenseAndCertificateById);
router.get('/licenseAndCertificate/getAllLicenseCertificates', licenseAndCertificateCont.getAllLicenseCertificates);
router.delete('/licenseAndCertificate/:id/deleteLicenseCertificate', licenseAndCertificateCont.deleteLicenseCertificate);

// hijokl
// Export the router
export default router;
