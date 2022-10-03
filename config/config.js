//connect to db
const dotenv = require("dotenv").config();
const { Sequelize } = require("sequelize");

//postgresql credentials
const dburl = {
  database: "Market",
  username: "postgres",
  password: "123",
  host: "localhost",
  port: 5432,
  dialect: "postgres",
};

module.exports = new Sequelize(dburl);
