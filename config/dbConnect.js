const { Client } = require("pg");
require("dotenv").config();
const dbConfig = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
});

const connectDB = async () => {
  try {
    await dbConfig.connect();
    console.log("Connected to postgres database");
  } catch (error) {
    console.log("Connect failed", error);
  }
};

module.exports = {
  dbConfig,
  connectDB,
};
