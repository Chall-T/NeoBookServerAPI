import express from 'express';

import { deleteUser, getAllUsers, getUser, updateUser } from '../controllers/users';
import { isAuthenticated, isOwner } from '../middlewares';

export default( router: express.Router) =>{
    router.get('/users', isAuthenticated, getAllUsers);
    router.get('/user/data', isAuthenticated, getUser);
    router.delete('/user/:id', isAuthenticated, isOwner, deleteUser);
    router.patch('/user/:id', isAuthenticated, isOwner, updateUser);
    router.patch('/user/add_to_company/:id', isAuthenticated, isOwner, updateUser);
};