import express from 'express';

import { deleteUserById, getUserById, getUsers } from '../database/users';
import {get, merge} from 'lodash';
import { getCompaniesByUserId } from '../database/companies';

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