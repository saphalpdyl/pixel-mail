import { createConnection } from "mysql";
import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();

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

	const sql = "SELECT * FROM users";
	conn.query(sql, (err, result) => {
		if (err) throw err;
		console.log("Result : ", result[0]);
	});
});
