const { DataTypes, Model } = require('sequelize');
const sequelize = require('./db');
class addresses extends Model { }

addresses.init(
     {
    street: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    postal_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true, // Set to false if the address must be linked to a user
      references: {
        model: 'Users', // Ensure this matches the name of your Users table
        key: 'id'
      },
      onDelete: 'SET NULL' // Optional: what should happen when a referenced user is deleted
    }
  }, {
    sequelize,
    tableName: 'addresses',
    timestamps: true, // Automatically creates createdAt and updatedAt fields
    underscored: true // Use snake_case for column names
  });

module.exports = addresses;
