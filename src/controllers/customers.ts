import express from 'express';
import {get, merge} from 'lodash';
import { deleteCustomerById, getCustomerById, getCustomers, createCustomer } from '../database/customers';
