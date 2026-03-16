
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || undefined,
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false

});

pool.connect((err, client, release) => {
  if (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  } else {
    console.log('Database connected!');
    release();
  }
});

pool.on('error', (err) => {
  console.error('Database error:', err);
});

module.exports = pool;