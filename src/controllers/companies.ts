import express from 'express';
import {get, merge} from 'lodash';
import { deleteCompanyById, getCompanyById, getCompanies, companyCreate } from '../database/companies';
import { CustomerModel, getCustomerById } from 'database/customers';

export const getAllCompanies = async(req: express.Request, res: express.Response) =>{
    try{
        const companies = await getCompanies();

        return res.status(200).json(companies);
    }catch (error){
        console.log(error);
        return res.sendStatus(400);
    }
}

export const deleteCompany = async(req: express.Request, res: express.Response) =>{
    try{
        const { id } = req.params;

        const deletedCompany = await deleteCompanyById(id);

        return res.json(deletedCompany)
    }catch (error){
        console.log(error);
        return res.sendStatus(400)
    }
}

export const updateCompany = async(req: express.Request, res: express.Response) =>{
    try{
        const { id } = req.params;
        const { name } = req.body;

        if (!name) {
            return res.sendStatus(400);
        }
        const company = await getCompanyById(id);
        company.name = name;
        await company.save()
        return res.status(200).json(company).end();
    }catch (error){
        console.log(error);
        return res.sendStatus(400)
    }
}

export const createCompany =async (req: express.Request, res: express.Response) =>{
    try{
        const {name} = req.body;
        const currentUser = get(req, 'identity') as string;
        if (!name){
            return res.sendStatus(400);
        }
        // const existingCompany = await getCompanyByName(name);
        // if (existingCompany){
        //     return res.sendStatus(400);
        // }
        //const user = await getUserById(currentUserId)
        //console.log(user);
        const company = await companyCreate({
            name,
            owner: currentUser
        });
        return res.status(200).json(company).end();
    }catch (error){
        console.log(error);
        return res.sendStatus(400);
    }
}

export const createCustomer = async (req: express.Request, res: express.Response) =>{
    try{
        const {name} = req.body;
        const currentUser = get(req, 'identity') as string;
        if (!name){
            return res.sendStatus(400);
        }
        // const existingCompany = await getCompanyByName(name);
        // if (existingCompany){
        //     return res.sendStatus(400);
        // }
        //const user = await getUserById(currentUserId)
        //console.log(user);
        const company = await companyCreate({
            name,
            owner: currentUser
        });
        return res.status(200).json(company).end();
    }catch (error){
        console.log(error);
        return res.sendStatus(400);
    }
}