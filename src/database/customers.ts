import mongoose, { Schema } from "mongoose";
import companies from "router/companies";

const CustomerSchema = new mongoose.Schema({
    first_name: {type: String, required: [true, 'Please enter your customer first name']},
    last_name: {type: String, required: false},
    email: {type: String, required: false},
    telephone: {
        country_code: {type: String, required: false},
        number: {type: String, select: false},
    },
    company: [{
        type: String
    }],
    added: {type: Date, default: Date.now()}
});

export const CustomerModel = mongoose.model('Customer', CustomerSchema);

export const getCustomers = () => CustomerModel.find();
export const getCustomerByEmail = (email: string) => CustomerModel.findOne({email});
export const getCustomersByCompany = (company: string) => CustomerModel.find({company});
export const getCustomerById = (id: string) => CustomerModel.findById(id);
export const createCustomer = (data: Record<string, any>) => new CustomerModel(data).save().then((customer) => customer.toObject());
export const deleteCustomerById = (id: string) => CustomerModel.findOneAndDelete({ _id: id});
export const updateCustomerById = (id: string, data: Record<string, any>) => CustomerModel.findByIdAndUpdate(id, data);

// export const addCustomerToCompany = (id: string) => getCustomerById(id).then(

// )
// export const getCompaniesByCustomerId = (id: string) => CustomerModel.findById(id).populate('owner');