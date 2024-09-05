const { DataTypes, Model } = require('sequelize');
const sequelize = require('./db');
class registrationOtp extends Model { }

registrationOtp.init(
    {

        email: {
            type: DataTypes.STRING(120),
            allowNull: false,
        },

        otp: {
            type: DataTypes.STRING(120),
            allowNull: false,
        },
    },
    {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'registrationOtp', // We need to choose the model name,
        tableName: 'registrationOtp',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
);

module.exports = registrationOtp;