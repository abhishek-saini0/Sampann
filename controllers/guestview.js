const path = require('path');
const User = require('../models/users');
const Bio = require('../models/bio');
const Education = require('../models/education');
const Interests = require('../models/interests');
const Addresses = require('../models/addresses');
const config = require('../config/config');
const jwt = require('jsonwebtoken');
const flash = require('express-flash');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(flash());

class guestview {
    static async homepage(req, res) {
        try {
            const token = req.session.token;
            const decodedToken = token ? jwt.verify(token, process.env.JWT_SECRET_KEY) : false;
            res.render("homepage", { decodedToken });
        } catch (error) {
            console.error('Error rendering homepage:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    static async about(req, res) {
        try {
            const token = req.session.token;
            const decodedToken = token ? jwt.verify(token, process.env.JWT_SECRET_KEY) : false;
            res.render("about", { decodedToken });
        } catch (error) {
            console.error('Error rendering about page:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    static async help(req, res) {
        try {
            const token = req.session.token;
            const decodedToken = token ? jwt.verify(token, process.env.JWT_SECRET_KEY) : false;
            res.render("help", { decodedToken });
        } catch (error) {
            console.error('Error rendering help page:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    static async showSignup(req, res) {
        try {
            const token = req.session.token;
            const decodedToken = token ? jwt.verify(token, process.env.JWT_SECRET_KEY) : false;
            res.render('registration', { message: req.flash('error'), decodedToken });
        } catch (error) {
            console.error('Error rendering signup page:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    static async showOtpForm(req, res) {
        try {
            res.render('otpreg', { message: req.flash('error') });
        } catch (error) {
            console.error('Error rendering OTP form:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    static async logout(req, res) {
        try {
            const token = req.session.token;
            const decodedToken = token ? jwt.verify(token, process.env.JWT_SECRET_KEY) : false;
            res.render("logout", { decodedToken });
        } catch (error) {
            console.error('Error rendering logout page:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    static async showLoginForm(req, res) {
        try {
            const token = req.session.token;
            const SITE_KEY = '6Lc8SzEqAAAAAECz8Y98xrfNJdTt6yQxJ4znUKNf';
            const decodedToken = token ? jwt.verify(token, process.env.JWT_SECRET_KEY) : false;
            res.render('login', { message: req.flash('error'), decodedToken, siteKey: SITE_KEY });
        } catch (error) {
            console.error('Error rendering login page:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    static async profile(req, res) {
        try {
            const token = req.session.token;
            if (!token) {
                return res.status(401).json({ message: 'No token provided' });
            }

            const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const id = decodedToken.id;

            const user = await User.findById(id).select('firstName lastName dateOfBirth email mobileNumber gender profilePhoto religion isVerified');
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const bio = await Bio.findOne({ user_id: id });
            const addresses = await Addresses.findOne({ user_id: id });
            const interests = await Interests.findOne({ user_id: id });
            const education = await Education.findOne({ user_id: id });
            const suggestions = await User.find();

            res.render('profile', {
                suggestions: suggestions || [],
                user: user || [],
                decodedToken: decodedToken || [],
                addresses: addresses || [],
                interests: interests || [],
                education: education || [],
                bio: bio || []
            });
        } catch (error) {
            console.error('Error fetching profile:', error);
            res.status(error.name === 'JsonWebTokenError' ? 401 : 500).json({ message: 'Internal server error', error: error.message });
        }
    }

    static async editprofile(req, res) {
        try {
            const token = req.session.token;
            if (!token) {
                return res.status(401).json({ message: 'No token provided' });
            }

            const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const id = decodedToken.id;

            const user = await User.findById(id);
            const bio = await Bio.findOne({ user_id: id });
            const addresses = await Addresses.findOne({ user_id: id });
            const interests = await Interests.findOne({ user_id: id });
            const education = await Education.findOne({ user_id: id });
            const suggestions = await User.find();

            res.render('editprofile', {
                suggestions: suggestions || [],
                user: user || [],
                decodedToken: decodedToken || [],
                addresses: addresses || [],
                interests: interests || [],
                education: education || [],
                bio: bio || []
            });
        } catch (error) {
            console.error('Error fetching editprofile:', error);
            res.status(error.name === 'JsonWebTokenError' ? 401 : 500).json({ message: 'Internal server error', error: error.message });
        }
    }

    static async match(req, res) {
        try {
            const token = req.session.token;
            if (!token) {
                return res.status(401).json({ message: 'No token provided' });
            }

            const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const id = decodedToken.id;
            const id2 = req.params.id;

            const user = await User.findById(id).select('firstName lastName dateOfBirth email mobileNumber gender profilePhoto religion');
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const user2 = await User.findById(id2).select('firstName lastName dateOfBirth email mobileNumber gender profilePhoto religion');
            const bio = await Bio.findOne({ user_id: id2 });
            const addresses = await Addresses.findOne({ user_id: id2 });
            const interests = await Interests.findOne({ user_id: id2 });
            const education = await Education.findOne({ user_id: id2 });
            const suggestions = await User.find();

            res.render('match', {
                suggestions: suggestions || [],
                user: user || [],
                user2: user2 || [],
                decodedToken: decodedToken || [],
                addresses: addresses || [],
                interests: interests || [],
                education: education || [],
                bio: bio || []
            });
        } catch (error) {
            console.error('Error fetching match profile:', error);
            res.status(error.name === 'JsonWebTokenError' ? 401 : 500).json({ message: 'Internal server error', error: error.message });
        }
    }

    static async viewpayment(req, res) {
        try {
            res.render("payment");
        } catch (error) {
            console.error('Error rendering payment:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }
}

module.exports = guestview;
