import express from 'express';
import {get, merge} from 'lodash';
import { getCompanyById } from '../database/companies';

import { getUserBySessionToken, getUserById } from '../database/users';

export const isOwner = async(req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{
        const { id } = req.params;
        const currentUserId = get(req, 'identity._id') as string;
        
        if (!currentUserId){
            return res.sendStatus(403);
        }
        if (currentUserId.toString() !== id){
            return res.sendStatus(403);
        }
        next();
    }catch (error){
        console.log(error);
        return res.sendStatus(400)
    }
}
export const isInCompany = async(req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{
        //const { company_id } = req.params;
        const { company_id } = req.body;
        const currentUserId = get(req, 'identity._id') as string;
        
        if (!currentUserId){
            return res.sendStatus(403);
        }
        const user = await getUserById(currentUserId.toString())
        
        for (var i = 0; i <= user.companies.length; i++){
            if (user.companies[i] == company_id ){
                const company = getCompanyById(company_id)
                break;
            }
        }
        //if (!company){
        //    return res.sendStatus(403);
        //}
        
        next();
    }catch (error){
        console.log(error);
        return res.sendStatus(400)
    }
}

export const isAuthenticated = async(req: express.Request, res: express.Response, next: express.NextFunction) =>{
    try{
        let sessionToken = req.cookies['NEO-AUTH'] || req.headers.authorization.split(" ")[1];
        if (!sessionToken){
            return res.sendStatus(403);
        }
        const existingUser = await getUserBySessionToken(sessionToken);

        if (!existingUser){
            return res.sendStatus(403);
        }
        merge(req, {identity: existingUser});

        return next();
    }catch (error){
        console.log(error);
        return res.sendStatus(400);
    }
}
