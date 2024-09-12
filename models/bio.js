const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bioSchema = new Schema({
    aboutMe: {
        type: String, // Mongoose supports long text as String
        required: false // Equivalent to allowNull: true
    },
    tagline: {
        type: String,
        required: false
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the Users collection
        ref: 'Users', // Reference to the Users model
        required: true // Equivalent to allowNull: false
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    collection: 'bio' // Specify the collection name
});

// Implement cascading delete behavior if needed
bioSchema.pre('remove', function(next) {
    // Logic for cascading delete (if necessary)
    next();
});

const Bio = mongoose.model('Bio', bioSchema);

module.exports = Bio;





// const { DataTypes, Model } = require('sequelize');
// const sequelize = require('./db');
// class bio extends Model { }

// bio.init( {
//     aboutMe: {
//       type: DataTypes.TEXT, // Use TEXT for longer text fields
//       allowNull: true // Set to false if this field is mandatory
//     },
//     tagline: {
//       type: DataTypes.STRING, // Use STRING for shorter text fields
//       allowNull: true // Set to false if this field is mandatory
//     },
//     user_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false, // Change to false if this field is mandatory
//       references: {
//         model: 'Users', // Ensure this matches the name of your Users table
//         key: 'id'
//       },
//       onDelete: 'CASCADE' // Optional: behavior when the referenced user is deleted
//     }
//   }, {
//     sequelize,
//     tableName: 'bio',
//     timestamps: true, // Automatically creates createdAt and updatedAt fields
//     underscored: true // Use snake_case for column names
//   });

// module.exports = bio;
