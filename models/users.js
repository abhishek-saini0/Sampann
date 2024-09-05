const { DataTypes, Model } = require('sequelize');
const sequelize = require('./db');
class Users extends Model { }

Users.init(
    {
        // Model attributes are defined here
        firstName: {
            type: DataTypes.STRING(120),
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING(120),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(120),
            allowNull: false,
            unique: true,
        },
        dateOfBirth: {
            type: DataTypes.STRING(120),
            allowNull: false,

        },
        mobileNumber: {
            type: DataTypes.BIGINT(20),
            allowNull: false,
            unique: true,
        },
        gender: {
            type: DataTypes.STRING(120),
            allowNull: false,
        },
        religion: {
            type: DataTypes.STRING(120),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(120),
            allowNull: false,
        },
        isVerified: {
            type: DataTypes.BOOLEAN(10),
            defaultValue: false
          },
          profilePhoto: {
            type: DataTypes.STRING(120),
            defaultValue: 'profile.jpg'
        },
    },
    {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'Users', // We need to choose the model name,
        tableName: 'users',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
);

module.exports = Users;
