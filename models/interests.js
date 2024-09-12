const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const interestSchema = new Schema({
    interest1: {
        type: String,
        required: false // Equivalent to allowNull: true
    },
    interest2: {
        type: String,
        required: false
    },
    interest3: {
        type: String,
        required: false
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the Users collection
        ref: 'Users', // Name of the model you're referencing (should match the exported model from Users)
        required: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    collection: 'Interests' // Specify the collection name
});

const Interests = mongoose.model('Interests', interestSchema);

module.exports = Interests;





// models/interest.js

// const { DataTypes, Model } = require('sequelize');
// const sequelize = require('./db');
// class interests extends Model { }

// interests.init( 
//     {
//     interest1: {
//       type: DataTypes.STRING,
//       allowNull: true
//     },
//     interest2: {
//       type: DataTypes.STRING,
//       allowNull: true
//     },
//     interest3: {
//       type: DataTypes.STRING,
//       allowNull: true
//     },
//     user_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: 'Users', // Name of the Users table
//         key: 'id'
//       }
//     }
//   }, 
//   {
//     sequelize,
//     tableName: 'Interests',
//     timestamps: true, // This will automatically create createdAt and updatedAt fields
//     underscored: true // To use snake_case for database column names
//   });

//   module.exports = interests;
