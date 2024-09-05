const { DataTypes, Model } = require('sequelize');
const sequelize = require('./db');
class education extends Model { }

education.init(
    {
      education: {
        type: DataTypes.STRING,
        allowNull: true
      },
      occupation: {
        type: DataTypes.STRING,
        allowNull: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Ensure this matches the name of your Users table
          key: 'id'
        },
        onDelete: 'CASCADE'
      }
    },
      {
        sequelize,
        tableName: 'education',
        timestamps: true, // This will automatically create createdAt and updatedAt fields
        underscored: true // To use snake_case for database column names
      });
    
      module.exports = education;
    
