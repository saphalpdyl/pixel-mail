import {createConnection} from 'mysql';
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';

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

if (!conn) throw error('Failed to connect to DB');

conn.connect((err) => {
  if (err) throw err;
});

// GET all the current emails
// * @saphalpdyl RESPONSE TYPE : List([...]) of all emails as json
app.get('/', (_, res) => {
  const sqlGetEmailQuery = 'SELECT * FROM emails';
  conn.query(sqlGetEmailQuery, (err, result) => {
    if (err) throw err;
    const responseRows = [];
    result.forEach((row) => {
      const parsedRow = JSON.parse(JSON.stringify(row)); // Parsing to JSON
      responseRows.push(parsedRow);
    });

    res.status(200);
    res.contentType('application/json');
    res.send(responseRows);
  });
});

// Prevent users from posting in '/'
app.post('/', (_, res) => {
  res.send('This end point cannot be used for POST methods');
});

// POST emails to database
/**
 * * @saphalpdyl RESPONSE {
 * * hasError : boolean ,
 * * emailId : number (from the sql result)
 * *}
 */
app.post('/post', (req, res) => {
  const sqlPost = `INSERT INTO emails(sender , sender_email , content) 
  VALUES ('${req.body.sender}' , '${req.body.sender_email}' ,
   '${req.body.content}');`;

  conn.query(sqlPost, (err, result) => {
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
      emailId: result.insertId,
    });
  });
});

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
