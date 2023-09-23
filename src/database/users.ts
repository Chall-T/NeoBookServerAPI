import mongoose, { Schema } from "mongoose";
import {getCompanyById} from "../database/companies";


const UserSchema = new mongoose.Schema({
    username: {type: String, required: [true, 'Please enter your username']},
    email: {type: String, required: [true, 'Please enter a valid email']},
    authentication: {
        password: {type: String, required: [true, "Please enter an password"], select: false, minlength: [8, "Minimum password lenght is 8 characters"]},
        salt: {type: String, select: false},
        sessionToken: {type: String, select: false},
    },
    companies: [{
        type: String
    }],
    companies_invites: [{
        type: String
    }],
    verified: {type: Boolean, default: false},
    role_id: {type: Number, default: 10},
    created: {type: Date, default: Date.now()}
});

export const UserModel = mongoose.model('User', UserSchema);

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({email});
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({
    'authentication.sessionToken': sessionToken,
});
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (data: Record<string, any>) => new UserModel(data).save().then((user) => user.toObject());
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id});
export const updateUserById = (id: string, data: Record<string, any>) => UserModel.findByIdAndUpdate(id, data);

export const userAcceptCompanyInvite = (invitedUser: any, company: any) => {
    if (!company){
        return [404, "Company not found"]
    }
    if (invitedUser.companies.includes(company)){
        return [400, "User already in company"]
    }
    if (invitedUser.companies_invites.includes(company)) {

        return [200, "Success"]
    } else {
        return [400, "User not invited to the company"]
    }

}

export const userSendCompanyInvite = (invitedUser: any, company: any) => {
    if (!company){
        return [404, "Company not found"]
    }
    if (invitedUser.companies_invites.includes(company)){
        return [400, "User already invited"]
    }
    if (!invitedUser.companies.includes(company)) {
        
        return [200, "Success"]
    } else {
        return [400, "User already in company"]
    }
    return [400, "Unknown error"]

}
// export const getCompaniesByUserId = (id: string) => UserModel.findById(id).populate('owner');
