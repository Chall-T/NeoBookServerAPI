import mongoose, { Schema } from "mongoose";

const CompanyUsersSchema = new mongoose.Schema({
    name: {type: String, require: true},
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
    verified: {type: Boolean, default: false},
    added: {type: Date, default: Date.now()}
});
export const CompanyUsersModel = mongoose.model('CompanyUsers', CompanyUsersSchema);

export const getCompanies = () => CompanyUsersModel.find();
// export const getCompaniesByOwner = (owner: any) => CompanyUsersModel.findOne({owner});

export const getCompanyById = (id: string) => CompanyUsersModel.findById(id);
export const companyCreate = (data: Record<string, any>) => new CompanyUsersModel(data).save().then((company) => company.toObject());
export const deleteCompanyById = (id: string) => CompanyUsersModel.findOneAndDelete({ _id: id});
export const updateCompanyById = (id: string, data: Record<string, any>) => CompanyUsersModel.findByIdAndUpdate(id, data);

export const getCompaniesByUserId = (id: string) => CompanyUsersModel.find({owner: id});
export const getCompanyByIdWithUser = (id: string) => CompanyUsersModel.findById({id}).populate('owner');