/**
 * This file deals with storing and handling License and Certificate information.
 */

import mongoose, {Schema, Document} from 'mongoose';

/**
 * Interface representing the structure of an LicenseAndCertificate document.
 */
export interface ILicenseAndCertificate extends Document {
    Course: string;
    content: string;
    school: string;
    duration: string;
    compilationDate: Date;
    certificate: string;
}

/**
 * Class representing the LicenseAndCertificate model.
 */
class LicenseAndCertificateModel {
    readonly model: mongoose.Model<ILicenseAndCertificate>;

    constructor(){
        const LicenseAndCertificateSchema = new Schema<ILicenseAndCertificate>({
            Course: {
                type: String,
                required: true,
            },
            content: {
                type: String,
                required: true,
            },
            school: {
                type: String,
                required: true,
            },
            duration: {
                type: String,
                required: true,
            },
            compilationDate: {
                type: Date,
                required: true,
            },
            certificate: {
                type: String,
                required: true,
            },

        });

        this.model = mongoose.model<ILicenseAndCertificate>('LicenseAndCertificate', LicenseAndCertificateSchema);
    }

     /**
     * Method to create a new LicenseAndCertificate document.
     * @param data Partial LicenseAndCertificate data to create.
     * @returns Promise resolving to the created LicenseAndCertificate document.
     */
   public createLicenseAndCertificate(data: Partial<ILicenseAndCertificate>): Promise<ILicenseAndCertificate>{
    return this.model.create(data);
   }

    /**
     * Method to find an LicenseAndCertificate document by ID.
     * @param id LicenseAndCertificate ID.
     * @returns Promise resolving to the found LicenseAndCertificate document, or null if not found.
     */
   public findLicenseAndCertificate(id: String): Promise<ILicenseAndCertificate | null>{
    return this.model.findById(id).exec();
   }

     /**
     * Method to update an LicenseAndCertificate document.
     * @param id LicenseAndCertificate ID to update.
     * @param data Partial LicenseAndCertificate data to update.
     * @returns Promise resolving to the updated LicenseAndCertificate document, or null if not found.
     */
   public updateLicenseAndCertificate(id: String, data: Partial<ILicenseAndCertificate>): Promise<ILicenseAndCertificate | null> { 
    return this.model.findByIdAndUpdate(id, data, {new: true}).exec();
   }

     /**
     * Method to delete an LicenseAndCertificate document.
     * @param id LicenseAndCertificate ID to delete.
     * @returns Promise resolving to the deleted LicenseAndCertificate document, or null if not found.
     */
   public deleteLicenseAndCertificate(id: string): Promise<ILicenseAndCertificate | null>{
    return this.model.findByIdAndDelete(id).exec();
   }

   public getAllLicenseAndCertificate(): Promise<ILicenseAndCertificate[]>{
    return this.model.find().exec();
   }
}

export default new LicenseAndCertificateModel();