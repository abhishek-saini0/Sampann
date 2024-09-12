const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registrationOtpSchema = new Schema({
    email: {
        type: String,
        required: true,
        maxlength: 120
    },
    otp: {
        type: String,
        required: true,
        maxlength: 120
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    collection: 'registrationOtp' // Specify the collection name
});

const RegistrationOtp = mongoose.model('RegistrationOtp', registrationOtpSchema);

module.exports = RegistrationOtp;






// const { DataTypes, Model } = require('sequelize');
// const sequelize = require('./db');
// class registrationOtp extends Model { }

// registrationOtp.init(
//     {

//         email: {
//             type: DataTypes.STRING(120),
//             allowNull: false,
//         },

//         otp: {
//             type: DataTypes.STRING(120),
//             allowNull: false,
//         },
//     },
//     {
//         // Other model options go here
//         sequelize, // We need to pass the connection instance
//         modelName: 'registrationOtp', // We need to choose the model name,
//         tableName: 'registrationOtp',
//         timestamps: true,
//         createdAt: 'created_at',
//         updatedAt: 'updated_at',
//     },
// );

// module.exports = registrationOtp;