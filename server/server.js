import {createConnection} from 'mysql';
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';

import {loginUser, registerUser} from './src/controllers/userController.js';
import {authenticate} from './src/middlewares/auth.js';

// Prevent server crash on error
process.on('uncaughtException', (err) =>
  console.error('Node caught and error : ', err),
);

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

// Email end points
app.get('/', authenticate, (req, res) => getAllEmails(req, res, conn));
app.post('/', authenticate, (req, res) => postEmail(req, res, conn));
app.delete('/:postid', authenticate, (req, res) => deleteEmail(req, res, conn));

// User end points
/**
 * ERR_CODE : {
 *
 *  ERR_USER_EXISTS_ALREADY ,
 *  ERR_USER_NO_EXISTS ,
 *  ERR_INVALID_PASSWORD ,
 *  ERR_DB_ERROR ,
 *  ERR_SERVER_ERROR ,
 *  ERR_TOKEN_PARSE_ERR ,
 *  ERR_INVALID_TOKEN ,
 *  ERR_TOKEN_EXPIRED ,
 *  ERR_TOKEN_REQUIRED ,
 *  ERR_MALFORMED_REQ
 *
 * }
 */
app.post('/login', (req, res) => loginUser(req, res, conn));
app.post('/register', (req, res) => registerUser(req, res, conn));

app.listen(8080, () => {
  console.log('Listening on port : 8080');
});
