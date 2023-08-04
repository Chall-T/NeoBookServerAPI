import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname+'/../.env' });

import router from './router';

const app = express();

app.use(cors({
    credentials: true,
}))

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

const server = http.createServer(app)
const port = process.env.PORT || 8080;
const domain = process.env.DOMAIN || 'localhost';
server.listen(port, () =>{
    console.log(`Server started: http://${domain}:${port}/`)
});
const MONGO_URL = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@neobook.8id9jqa.mongodb.net/?retryWrites=true&w=majority`;

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));

console.log('a')
app.use('/', router());