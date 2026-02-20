const { Pool } = require('pg');
require('dotenv').config();


const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.on("error", (err) => {
  console.error("Unexpected database error:", err)
})

pool.connect((err, client, release) =>{
  if(err){
    console.log("Failed to connect to the database:", err);
    process.exit(1);
  } else{
    console.log("Database Connected!")
    release()
  }
})

module.exports = pool;