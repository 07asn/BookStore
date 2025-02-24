// db.js
const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "book_catalog",
    password: "123",
    port: 5432,
});

async function query(text, params) {
    const res = await pool.query(text, params);
    return res;
}

module.exports = { query };
