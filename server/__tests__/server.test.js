const mysql = require("mysql");

describe("Database connection check", () => {
	let conn;

	beforeAll(() => {
		conn = mysql.createConnection({
			host: process.env.DB_HOST,
			user: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
		});

		conn.connect((err) => {
			if (err) throw err;
		});
	});

	afterAll(() => {
		conn.end();
	});

	test("Should return users from the database", () => {
		const sql = "SELECT * FROM users";

		conn.query(sql, (err, res) => {
			if (err) return -1;

			expect(res.length).toBeGreaterThan(0);
			done();
		});
	});
});
