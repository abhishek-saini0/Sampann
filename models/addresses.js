const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    street: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: false
    },
    postal_code: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: false
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the Users collection
        ref: 'Users', // Reference to the Users model
        required: true, // Equivalent to allowNull: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    collection: 'addresses' // Specify the collection name
});

// Implement 'onDelete: SET NULL' behavior if necessary
addressSchema.pre('remove', function(next) {
    // Logic for handling cascade or null set, if needed
    next();
});

const Addresses = mongoose.model('Addresses', addressSchema);

module.exports = Addresses;





// const { DataTypes, Model } = require('sequelize');
// const sequelize = require('./db');
// class addresses extends Model { }

// addresses.init(
//      {
//     street: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     city: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     state: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     postal_code: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     country: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     user_id: {
//       type: DataTypes.INTEGER,
//       allowNull: true, // Set to false if the address must be linked to a user
//       references: {
//         model: 'Users', // Ensure this matches the name of your Users table
//         key: 'id'
//       },
//       onDelete: 'SET NULL' // Optional: what should happen when a referenced user is deleted
//     }
//   }, {
//     sequelize,
//     tableName: 'addresses',
//     timestamps: true, // Automatically creates createdAt and updatedAt fields
//     underscored: true // Use snake_case for column names
//   });

// module.exports = addresses;
