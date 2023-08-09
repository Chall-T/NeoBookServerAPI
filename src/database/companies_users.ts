import mongoose, { Schema } from "mongoose";

const CompanyUsersSchema = new mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    company_id: {
        type: Schema.Types.ObjectId,
        ref: "Company",
        require: true
    },
    roles: [{
        Role:{
            type: Schema.Types.ObjectId,
            ref: "Role",
            require: false
        },
        updated:{
            type: Date, default: Date.now()
        },
        updated_by:{
            type: Schema.Types.ObjectId,
            ref: "User",
            require: true
        }
    }],
    added_by: {
        type: Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    added: {type: Date, default: Date.now()}
});
export const CompanyUsersModel = mongoose.model('CompanyUsers', CompanyUsersSchema);

export const getCompaniesUser = () => CompanyUsersModel.find();
// export const getCompaniesUserByOwner = (owner: any) => CompanyUsersModel.findOne({owner});

export const getCompanyUserById = (id: string) => CompanyUsersModel.findById(id);
export const companyUserCreate = (data: Record<string, any>) => new CompanyUsersModel(data).save().then((companyUser) => companyUser.toObject());
export const deleteCompanyUserById = (id: string) => CompanyUsersModel.findOneAndDelete({ _id: id});
export const updateCompanyUserById = (id: string, data: Record<string, any>) => CompanyUsersModel.findByIdAndUpdate(id, data);

export const getCompaniesUserByUserId = (id: string) => CompanyUsersModel.find({owner: id});
export const getCompanyUserByIdWithUser = (id: string) => CompanyUsersModel.findById({id}).populate('owner');