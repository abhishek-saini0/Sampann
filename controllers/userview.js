const User = require('../models/users'); // Assuming this is a Mongoose model
const jwt = require('jsonwebtoken');
const flash = require('express-flash');
const express = require('express');
const app = express();
app.use(flash());

class userview {
    // View the edit user page
    static async viewedituser(req, res) {
        try {
            const token = req.session.token;
            if (!token) {
                return res.status(401).json({ message: 'No token provided' });
            }

            const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const id = decodedToken.id;

            // Mongoose query to find user by ID
            const user = await User.findById(id);

            res.render('edituser', {
                user: user || {},
            });
        } catch (error) {
            console.error('Error fetching edituser:', error);
            res.status(error.name === 'JsonWebTokenError' ? 401 : 500).json({ message: 'Internal server error' });
        }
    }

    // Edit user information
    static async edituser(req, res) {
        try {
            const token = req.session.token;
            if (!token) {
                return res.status(401).json({ message: 'No token provided' });
            }

            const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const id = decodedToken.id;

            const updateData = {
                firstName: req.body.firstname,
                lastName: req.body.lastname,
                religion: req.body.religion,
                gender: req.body.gender,
                profilePhoto: req.file ? req.file.filename : undefined,
                dateOfBirth: req.body.dob,
            };

            // Remove undefined fields before updating
            Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

            // Mongoose query to update the user by ID
            const result = await User.findByIdAndUpdate(id, updateData, { new: true });

            res.redirect('/profile');
        } catch (error) {
            console.error('Error in edituser:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // View chat page
    static async viewchat(req, res) {
        res.render('chat');
    }

    // Chat functionality (for now, this is empty)
    static async chat(req, res) {
        // Chat logic can be added here
    }
}

module.exports = userview;
