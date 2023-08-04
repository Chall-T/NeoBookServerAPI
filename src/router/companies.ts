import express from 'express';

import { createCompany, deleteCompany, getAllCompanies, updateCompany } from '../controllers/companies';
import { isAuthenticated, isOwner } from '../middlewares';

export default( router: express.Router) =>{
    router.get('/companies', getAllCompanies);
    router.delete('/companies/:id', isAuthenticated, isOwner, deleteCompany)
    router.patch('/companies/:id', isAuthenticated, isOwner, updateCompany)
    router.post('/companies/create', isAuthenticated, createCompany);
};