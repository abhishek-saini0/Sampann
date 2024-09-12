// // config/sequelize.js
// // const { Sequelize } = require('sequelize');

// // // Use DATABASE_URL if provided, otherwise use individual env vars
// // const sequelize = new Sequelize(process.env.DATABASE_URL || {
// //   database: process.env.DB_NAME,
// //   username: process.env.DB_USER,
// //   password: process.env.DB_PASSWORD,
// //   host: process.env.DB_HOST,
// //   port: process.env.DB_PORT,
// //   dialect: 'postgres',
// //   dialectOptions: {
// //     ssl: {
// //       require: true, // Enforces SSL for security
// //       rejectUnauthorized: false // Needed for self-signed certificates
// //     }
// //   }
// // });

// // module.exports = sequelize;


// // const { Sequelize } = require('sequelize');
// // const config = require('../config/config');

// // const sequelize = new Sequelize(config.database.database, config.database.user, config.database.password, {
// //     host: config.database.host,
// //     dialect: 'mysql'
// // });                                                                                                                                                                                    

// // module.exports = sequelize;

// const mongoose = require('mongoose')
// mongoose.connect(process.env.MONGODB_URL)
// .then(()=> console.log("mongodb connected"))
// .catch((error)=> console.log(error))







// const { Sequelize } = require('sequelize');

// // Create a new Sequelize instance with your MySQL credentials
// const sequelize = new Sequelize('sql12730836', 'sql12730836', 'XCNtNCYXXW', {
//   host: 'sql12.freesqldatabase.com',
//   dialect: 'mysql', // Dialect for MySQL
//   port: 3306, // Default MySQL port
//   logging: false, // Disable logging if not needed
//   dialectOptions: {
//     ssl: {
//       require: false,  // If SSL is required
//       rejectUnauthorized: false // Set to true if you have a valid SSL certificate
//     }
//   }
// });

// // Test the connection 
// sequelize.authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

// module.exports = sequelize;



