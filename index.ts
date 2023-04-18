import express from "express";
import dotenv from "dotenv";
import client from "./database";
import bodyParser from 'body-parser';


const app = express();
app.use(bodyParser.json());
dotenv.config()

const port = process.env.PORT || 5000


app.post("/add", async (req, res) => {
    let { year, title, startDate, endDate } = req.body;
    try {
        client.connect();
        await client.query('BEGIN');
        await client.query('INSERT INTO crud (year, title, start_date, end_date) VALUES ($1, $2, $3, $4)', [year, title, startDate, endDate]);
        await client.query('COMMIT');
        res.status(200).send('data add to database');
    } catch (e) {
        await client.query('ROLLBACK');
        console.error(e);
        res.status(500).send('Error adding data to database');
    } finally {
        await client.end();               
    }
})

app.listen(port, () => {
    console.log(`${port} listening `);
})
