import { Client } from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: process.env.PASSWORD,
    database: 'crud',
})

export default client;