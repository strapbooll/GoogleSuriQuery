const Sequelize  = require('sequelize');
const sequelize = new Sequelize(process.env.DB_DATABASE,process.env.DB_USER, process.env.DB_PASS,{
  host: process.env.DB_URL,
  dialect: process.env.DB_DIALECT
});

module.exports = sequelize;