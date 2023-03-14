import {createConnection} from 'mysql';
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';

// Controllers
import {getAllEmails, postEmail} from './src/controllers/emailController.js';

const app = express();
dotenv.config({path: '.env.development'});

// Required to parse JSON body in post request
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(
    cors({
      origin: '*',
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

// DELETE emails from database
/**
 * * @saphalpdyl RESPONSE {
 * * hasError : boolean ,
 * * code ?: string
 * *}
 */
app.delete('/delete/:postid', (req, res) => {
  const sqlDeleteQuery = `DELETE FROM emails WHERE id=${req.params.postid}`;

  conn.query(sqlDeleteQuery, (err, result) => {
    res.header({
      'Content-Type': 'application/json',
    });

    if (err) {
      res.status(400);
      res.send({
        hasError: true,
        code: err.code,
      });
      return;
    }

    res.status(200);
    res.send({
      hasError: false,
    });
  });
});

app.listen(8080, () => {
  console.log('Listening on port : 8080');
});
