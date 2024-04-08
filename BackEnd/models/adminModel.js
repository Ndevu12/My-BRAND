
import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

class AdminModel{
    constructor(){
// Define the schema for the Admin collection
const adminSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'admin', 
    },
});

// Create and export the Admin model
this.model = model('Admin', adminSchema);
    }

    async createAdmin(data){
        const admin = await this.model.create(data).exec();
        admin.save();
        return admin;
   }
 
   async findAdmin(){
    return await this.model.find().exec();
   }

   async findOne(){
    return await this.model.findOne({ username }).exec();
   }

   async getAdminById(id){
    return await this.model.findById(id).exec();
   }

   async deleteAdmin(id){
    return await this.model.findByIdAndDelete(id).exec();
   }

   async updateAdmin(id, data){
    const updateAdmin = await this.model.findByIdAndUpdate(id, data, {new: true}).exec();
    updateAdmin.save();
    return updateAdmin;
   }
}
export default AdminModel;