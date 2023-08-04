import express from 'express';
import authentication from './authentication';
import users from './users';
import companies from './companies';
export const router = express.Router();

export default(): express.Router =>{
    authentication(router);
    users(router);
    companies(router)
    return router;
};