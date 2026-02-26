const { Pool } = require("pg")
require("dotenv").config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
})

pool.connect((err, Client, release) => {
    if (err) {
        console.error("Failed to connect:", err.message);
        process.exit(1);
    } else {
        console.log("Database Connected");
        release();
    }
});


module.exports = pool;