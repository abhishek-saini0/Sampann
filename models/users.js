const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        maxlength: 120
    },
    lastName: {
        type: String,
        required: true,
        maxlength: 120
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 120
    },
    dateOfBirth: {
        type: String, // Use Date if you want strict date handling
        required: true,
        maxlength: 120
    },
    mobileNumber: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true,
        maxlength: 120
    },
    religion: {
        type: String,
        required: true,
        maxlength: 120
    },
    password: {
        type: String,
        required: true,
        maxlength: 120
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    profilePhoto: {
        type: String,
        default: 'profile.jpg'
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    collection: 'users' // To specify the collection name
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;





// const { DataTypes, Model } = require('sequelize');
// const sequelize = require('./db');
// class Users extends Model { }

// Users.init(
//     {
//         // Model attributes are defined here
//         id: {
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true
//           },
//         firstName: {
//             type: DataTypes.STRING(120),
//             allowNull: false,
//         },
//         lastName: {
//             type: DataTypes.STRING(120),
//             allowNull: false,
//         },
//         email: {
//             type: DataTypes.STRING(120),
//             allowNull: false,
//             unique: true,
//         },
//         dateOfBirth: {
//             type: DataTypes.STRING(120),
//             allowNull: false,

//         },
//         mobileNumber: {
//             type: DataTypes.BIGINT(20),
//             allowNull: false,
//             unique: true,
//         },
//         gender: {
//             type: DataTypes.STRING(120),
//             allowNull: false,
//         },
//         religion: {
//             type: DataTypes.STRING(120),
//             allowNull: false,
//         },
//         password: {
//             type: DataTypes.STRING(120),
//             allowNull: false,
//         },
//         isVerified: {
//             type: DataTypes.BOOLEAN(10),
//             defaultValue: false
//           },
//           profilePhoto: {
//             type: DataTypes.STRING(120),
//             defaultValue: 'profile.jpg'
//         },
//     },
//     {
//         // Other model options go here
//         sequelize, // We need to pass the connection instance
//         modelName: 'Users', // We need to choose the model name,
//         tableName: 'users',
//         timestamps: true,
//         createdAt: 'created_at',
//         updatedAt: 'updated_at',
//     },
// );

// module.exports = Users;
