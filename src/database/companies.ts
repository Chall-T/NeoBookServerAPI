import mongoose, { Schema } from "mongoose";

const CompanySchema = new mongoose.Schema({
    name: {type: String, require: true},
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    verified: {type: Boolean, default: false},
    created: {type: Date, default: Date.now()}
});
export const CompanyModel = mongoose.model('Company', CompanySchema);

export const getCompanies = () => CompanyModel.find().populate('owner');
// export const getCompaniesByOwner = (owner: any) => CompanyModel.findOne({owner});

export const getCompanyById = (id: string) => CompanyModel.findById(id);
export const companyCreate = (data: Record<string, any>) => new CompanyModel(data).save().then((company) => company.toObject());
export const deleteCompanyById = (id: string) => CompanyModel.findOneAndDelete({ _id: id});
export const updateCompanyById = (id: string, data: Record<string, any>) => CompanyModel.findByIdAndUpdate(id, data);

export const getCompaniesByUserId = (id: string) => CompanyModel.find({owner: id});
export const getCompanyByIdWithUser = (id: string) => CompanyModel.findById({id}).populate('owner');