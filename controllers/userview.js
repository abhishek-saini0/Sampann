const User = require('../models/users');
const Bio = require('../models/bio');
const Education = require('../models/education');
const Interests = require('../models/interests');
const Addresses = require('../models/addresses');
const config = require('../config/config');
const jwt = require('jsonwebtoken');
const flash = require('express-flash');
const express = require('express');
const app = express();
app.use(flash());

class userview {
    static async viewedituser(req, res) {
        try {
            const token = req.session.token;
            console.log(token);
            if (!token) {
                return res.status(401).json({ message: 'No token provided' });
            }
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const id = decodedToken.id;
            const user = await User.findOne({
                where: { id: id }
            });
            res.render('edituser', {
                user: user || [],
            });
        } catch (error) {
            console.error('Error fetching edituser:', error);
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ message: 'Invalid token' });
            } else {
                return res.status(500).json({ message: 'Internal server error' });
            }
        }
    }

    static async edituser(req, res) {
        try {
            console.log('Request received for edituser');
            console.log(req.body.firstname);
            const token = req.session.token;
            console.log('Token:', token);
            if (!token) {
                return res.status(401).json({ message: 'No token provided' });
            }
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
            console.log('Decoded Token:', decodedToken);
            const id = decodedToken.id;
            console.log('User ID:', id);
            const updateData = {
                firstName: req.body.firstname,
                lastName: req.body.lastname,
                religion: req.body.religion,
                gender: req.body.gender,
                profilePhoto: req.file.filename,
                dateOfBirth: req.body.dob,
            };
            console.log('Update Data:', updateData);
            const result = await User.update(updateData, { where: { id: id } });
            console.log('Update Result:', result);
            res.redirect('/profile');
            console.log(req.file.filename);
        }
        catch (error) {
            console.error('Error in edituser:', error);
            res.status(500).json({
                message: 'Internal server error'
            });
        }
    }


    static async viewchat(req, res){
        res.render('chat');
    }


    static async chat(req, res){
        
    }
}
module.exports = userview;
