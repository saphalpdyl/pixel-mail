import { createConnection } from "mysql";
import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config({ path: ".env.development" });

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

		res.send(response_rows);
	});
});

app.listen(8080, () => {
	console.log("Listening on port : 8080");
});
