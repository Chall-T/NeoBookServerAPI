import mongoose, { Schema } from "mongoose";

const RoleSchema = new mongoose.Schema({
    name: {type: String, required: true},
    permissions: [
        {
            type: String,
            required: true
        }
    ]
});
export const RoleModel = mongoose.model('Role', RoleSchema);

export const getRoles = () => RoleModel.find();
// export const getCompaniesByOwner = (owner: any) => RoleModel.findOne({owner});

export const getRoleById = (id: string) => RoleModel.findById(id);
export const deleteRoleById = (id: string) => RoleModel.findOneAndDelete({ _id: id});
export const updateRoleById = (id: string, data: Record<string, any>) => RoleModel.findByIdAndUpdate(id, data);

export const createRole = (data: Record<string, any>) => new RoleModel(data).save().then((role) => role.toObject());