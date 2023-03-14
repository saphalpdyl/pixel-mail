import {createConnection} from 'mysql';
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';

// Controllers
import {
  deleteEmail,
  getAllEmails,
  postEmail,
} from './src/controllers/emailController.js';

const app = express();
dotenv.config({path: '.env.development'});

// Required to parse JSON body in post request
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(
    cors({
      origin: '*',
      credentials: true,
      methods: ['GET', 'POST', 'DELETE'],
      optionsSuccessStatus: 200,
    }),
);

// Create a Database connection to MariaDB Database at port 3060
const conn = createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

if (!conn) throw Error('Failed to connect to DB');

conn.connect((err) => {
  if (err) throw err;
});

app.get('/', (req, res) => getAllEmails(req, res, conn));
app.post('/post', (req, res) => postEmail(req, res, conn));
app.delete('/delete/:postid', (req, res) => deleteEmail(req, res, conn));

app.listen(8080, () => {
  console.log('Listening on port : 8080');
});
