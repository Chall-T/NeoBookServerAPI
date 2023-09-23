import express from 'express';

import { deleteUserById, getUserById, getUsers, userAcceptCompanyInvite, userSendCompanyInvite } from '../database/users';
import {get, merge} from 'lodash';
import { getCompaniesByUserId, getCompanyById } from '../database/companies';

export const getAllUsers = async(req: express.Request, res: express.Response) =>{
    try{
        const users = await getUsers();

        return res.status(200).json(users);
    }catch (error){
        console.log(error);
        return res.sendStatus(400);
    }
}

export const getUser = async(req: express.Request, res: express.Response) =>{
    try{
        const currentUserId = get(req, 'identity._id') as string;
        const user_data = await getUserById(currentUserId);
        const companies_owned = await getCompaniesByUserId(currentUserId);
        //merge(user, {companies_owner: companies_owner});
        const user = {user_data,companies_owned:companies_owned}
        return res.status(200).json(user);
    }catch (error){
        console.log(error);
        return res.sendStatus(400);
    }
}

export const deleteUser = async(req: express.Request, res: express.Response) =>{
    try{
        const { id } = req.params;

        const deletedUser = await deleteUserById(id);

        return res.json(deletedUser)
    }catch (error){
        console.log(error);
        return res.sendStatus(400)
    }
}

export const updateUser = async(req: express.Request, res: express.Response) =>{
    try{
        const { id } = req.params;
        const { username } = req.body;

        if (!username) {
            return res.sendStatus(400);
        }
        const user = await getUserById(id);
        user.username = username;
        await user.save()
        return res.status(200).json(user).end();
    }catch (error){
        console.log(error);
        return res.sendStatus(400)
    }
}

export const CompanyAcceptInvite = async(req: express.Request, res: express.Response) =>{
    try{
        const { company } = req.body;
        const currentUserId = get(req, 'identity._id') as string;

        if (!company) {
            return res.sendStatus(400);
        }
        const user = await getUserById(currentUserId);
        if (user.companies.includes(company)){
            return res.sendStatus(400);
        }
        for (var i = 0; i <= user.companies_invites.length; i++){
            if (user.companies_invites[i] == company ){
                user.companies.push(company);
                const company_invite_index = user.companies_invites.indexOf(company);
                user.companies_invites.splice(company_invite_index, 1);
                var user_updated = true;
                break;
            }
        }

        if (!user_updated) {
            return res.sendStatus(400);
        }

        await user.save()
        return res.status(200).json(user).end();
    }catch (error){
        console.log(error);
        return res.sendStatus(400)
    }
}

export const CompanyCreateInvite = async(req: express.Request, res: express.Response) =>{
    try{
        const { IviteUserid } = req.params;
        const { company_id } = req.body;
        const currentUserId = get(req, 'identity._id') as string;
        if (!company_id) {
            return res.sendStatus(400);
        }
        const invitedUser = await getUserById(IviteUserid);
        const user = await getUserById(currentUserId);
        const company = await getCompanyById(company_id);
        for (var i=0; i <= user.companies.length; i++){
            if (user.companies[i] == company.id){
                // check roles
            }
        }

        if (invitedUser.companies.includes(company_id)){
            return res.sendStatus(400);
        }
        if (invitedUser.companies_invites.includes(company_id)){
            return res.sendStatus(400);
        }
        invitedUser.companies.push(company_id)

        await user.save()
        return res.status(200).json(user).end();
    }catch (error){
        console.log(error);
        return res.sendStatus(400)
    }
}

export const LeaveCompany = async(req: express.Request, res: express.Response) =>{
    try{
        const { company_id } = req.body;
        const currentUserId = get(req, 'identity._id') as string;
        if (!company_id) {
            return res.sendStatus(400);
        }
        const user = await getUserById(currentUserId);
        if (user.companies.includes(company_id)){
            return res.sendStatus(400);
        }
        for (var i = 0; i <= user.companies.length; i++){
            if (user.companies[i] == company_id ){
                const company_index = user.companies.indexOf(company_id);
                user.companies_invites.splice(company_index, 1);
                var user_updated = true;
                break;
            }
        }

        if (!user_updated) {
            return res.sendStatus(404);
        }

        await user.save()
        return res.status(200).json(user).end();
    }catch (error){
        console.log(error);
        return res.sendStatus(400)
    }
}
function remove_invites_from_user(user:any, company_id:string){
    if (user.companies_invites.includes(company_id)){
        const company_index = user.companies_invites.indexOf(company_id);
        user.companies_invites.splice(company_index, 1);
        remove_invites_from_user(user, company_id)
    }else{
        return true;
    }
}
export const RejectCompanyInvite = async(req: express.Request, res: express.Response) =>{
    try{
        const { company_id } = req.body;
        const currentUserId = get(req, 'identity._id') as string;
        if (!company_id) {
            return res.sendStatus(400);
        }
        const user = await getUserById(currentUserId);
        if (user.companies_invites.includes(company_id)){
            remove_invites_from_user(user, company_id)
        }else{}
        
        await user.save()
        return res.status(200).json(user).end();
    }catch (error){
        console.log(error);
        return res.sendStatus(400)
    }
}