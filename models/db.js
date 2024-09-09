// config/sequelize.js
const { Sequelize } = require('sequelize');

// Use DATABASE_URL if provided, otherwise use individual env vars
const sequelize = new Sequelize(process.env.DATABASE_URL || {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true, // Enforces SSL for security
      rejectUnauthorized: false // Needed for self-signed certificates
    }
  }
});

module.exports = sequelize;


// const { Sequelize } = require('sequelize');
// const config = require('../config/config');

// const sequelize = new Sequelize(config.database.database, config.database.user, config.database.password, {
//     host: config.database.host,
//     dialect: 'mysql'
// });

// module.exports = sequelize;