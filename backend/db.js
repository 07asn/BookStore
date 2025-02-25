require('dotenv').config(); 
const { Pool } = require("pg");

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});

async function query(text, params) {
    const res = await pool.query(text, params);
    return res;
}

module.exports = { query };
