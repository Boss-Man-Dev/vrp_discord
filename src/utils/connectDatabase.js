const mongoose = require('mongoose');
const mysql = require('mysql2');
require('dotenv').config();

async function MongoDB() {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGODB_URI, { keepAlive: true });

    console.log('Connected to MongoDB.');
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

async function oxmysql() {
  try {
    const connection = mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABSE,
    });

    await connection.promise().connect();
    console.log('Connected to MySQL database.');

    //connection.end();
    
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

module.exports = {
  MongoDB,
  oxmysql,
};