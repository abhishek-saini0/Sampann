const { DataTypes, Model } = require('sequelize');
const sequelize = require('./db');
class bio extends Model { }

bio.init( {
    aboutMe: {
      type: DataTypes.TEXT, // Use TEXT for longer text fields
      allowNull: true // Set to false if this field is mandatory
    },
    tagline: {
      type: DataTypes.STRING, // Use STRING for shorter text fields
      allowNull: true // Set to false if this field is mandatory
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false, // Change to false if this field is mandatory
      references: {
        model: 'Users', // Ensure this matches the name of your Users table
        key: 'id'
      },
      onDelete: 'CASCADE' // Optional: behavior when the referenced user is deleted
    }
  }, {
    sequelize,
    tableName: 'bio',
    timestamps: true, // Automatically creates createdAt and updatedAt fields
    underscored: true // Use snake_case for column names
  });

module.exports = bio;
