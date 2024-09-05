// models/interest.js

const { DataTypes, Model } = require('sequelize');
const sequelize = require('./db');
class interests extends Model { }

interests.init( 
    {
    interest1: {
      type: DataTypes.STRING,
      allowNull: true
    },
    interest2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    interest3: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // Name of the Users table
        key: 'id'
      }
    }
  }, 
  {
    sequelize,
    tableName: 'Interests',
    timestamps: true, // This will automatically create createdAt and updatedAt fields
    underscored: true // To use snake_case for database column names
  });

  module.exports = interests;
