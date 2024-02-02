import mysql from 'mysql2/promise';

// Create the connection to database
const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD
});


// Create a connection pool
const pool = mysql.createPool(db);

// Exporting the pool to be used in other modules
module.exports = pool.promise();