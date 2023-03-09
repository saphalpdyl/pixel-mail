import { createConnection } from "mysql";
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
dotenv.config({ path: ".env.development" });

// Required to parse JSON body in post request
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
	cors({
		origin: "*",
		methods: ["GET", "POST"],
		optionsSuccessStatus: 200,
	})
);

// Create a Database connection to MariaDB Database at port 3060
const conn = createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
});

if (!conn) throw "Failed to connect to DB";

conn.connect((err) => {
	if (err) throw err;
});

// GET all the current emails
app.get("/", (_, res) => {
	const sql_query_get_all_email = "SELECT * FROM emails";
	conn.query(sql_query_get_all_email, (err, result) => {
		if (err) throw err;
		const response_rows = [];
		result.forEach((row) => {
			const parsedRow = JSON.parse(JSON.stringify(row)); // Parsing the tuple to JSON
			response_rows.push(parsedRow);
		});

		res.status(200);
		res.contentType("application/json");
		res.send(response_rows);
	});
});

// Prevent users from posting in '/'
app.post("/", (_, res) => {
	res.send("This end point cannot be used for POST methods");
});

// POST emails to database
app.post("/post", (req, res) => {
	const sql_post = `INSERT INTO emails(sender , sender_email , content) VALUES ('${req.body.sender}' , '${req.body.sender_email}' , '${req.body.content}');`;

	conn.query(sql_post, (err, result) => {
		if (err) {
			res.status(400);
			res.header({
				"Content-Type": "application/text",
			});
			res.send({
				hasError: true,
				code: err.code,
			});
			return;
		}

		res.status(200);
		res.header({
			"Content-Type": "application/json",
		});
		res.send({
			hasError: false,
			emailId: result.insertId,
		});
	});
});

app.listen(8080, () => {
	console.log("Listening on port : 8080");
});
