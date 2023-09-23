import express from 'express';

import { deleteUser, getAllUsers, getUser, updateUser, CompanyCreateInvite, RejectCompanyInvite } from '../controllers/users';
import { isAuthenticated, isOwner } from '../middlewares';

export default( router: express.Router) =>{
    router.get('/users', isAuthenticated, getAllUsers); // debug
    router.get('/user/data', isAuthenticated, getUser);
    router.delete('/user/:id', isAuthenticated, isOwner, deleteUser);
    router.patch('/user/:id', isAuthenticated, isOwner, updateUser);
    router.post('/user/invite_to_company/:id', isAuthenticated, CompanyCreateInvite); // add check roles 
    router.post('/user/reject_invite/:id', isAuthenticated, RejectCompanyInvite);
};