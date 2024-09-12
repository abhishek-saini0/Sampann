const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const educationSchema = new Schema({
    education: {
        type: String,
        required: false // Equivalent to allowNull: true
    },
    occupation: {
        type: String,
        required: false
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the Users collection
        ref: 'Users', // Name of the model you're referencing (Users)
        required: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    collection: 'education' // Specify the collection name
});

// Define cascading delete behavior (similar to `onDelete: 'CASCADE'`)
educationSchema.pre('remove', function(next) {
    // Implement logic for cascading delete if needed
    next();
});

const Education = mongoose.model('Education', educationSchema);

module.exports = Education;





// const { DataTypes, Model } = require('sequelize');
// const sequelize = require('./db');
// class education extends Model { }

// education.init(
//     {
//       education: {
//         type: DataTypes.STRING,
//         allowNull: true
//       },
//       occupation: {
//         type: DataTypes.STRING,
//         allowNull: true
//       },
//       user_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//           model: 'Users', // Ensure this matches the name of your Users table
//           key: 'id'
//         },
//         onDelete: 'CASCADE'
//       }
//     },
//       {
//         sequelize,
//         tableName: 'education',
//         timestamps: true, // This will automatically create createdAt and updatedAt fields
//         underscored: true // To use snake_case for database column names
//       });
    
//       module.exports = education;
    
