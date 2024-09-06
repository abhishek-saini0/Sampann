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
            if (!token) {
                const decodedToken = false;
                res.render("homepage", { decodedToken });
            }
            else {
                const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
                res.render("homepage", { decodedToken });
            }
        } catch (error) {
            console.error('Error rendering homepage:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async about(req, res) {
        try {
            const token = req.session.token;
            if (!token) {
                const decodedToken = false;
                res.render("about", { decodedToken });
            }
            else {
                const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
                res.render("about", { decodedToken });
            }
        } catch (error) {
            console.error('Error rendering about page:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async help(req, res) {
        try {
            const token = req.session.token;
            if (!token) {
                const decodedToken = false;
                res.render("help", { decodedToken });
            }
            else {
                const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
                res.render("help", { decodedToken });
            }
        } catch (error) {
            console.error('Error rendering help page:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async showSignup(req, res) {
        try {

            const token = req.session.token;
            if (!token) {
                const decodedToken = false;
                return res.render('registration', { message: req.flash('error'), decodedToken });
            }
            else {
                const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
                return res.render("registration", { decodedToken });
            }

        } catch (error) {
            console.error('Error rendering signup page:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async showOtpForm(req, res) {
        try {
            return res.render('otpreg', { message: req.flash('error') });
        } catch (error) {
            console.error('Error rendering OTP form:', error);
            res.status(500).json({
                message: 'Internal server error'
            });
        }
    }

    static async logout(req, res) {
        try {
            const token = req.session.token;
            console.log(token);
            if (!token) {
                const decodedToken = false;
                return res.render("logout", { decodedToken });
            }
            else {
                const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
                return res.render("logout", { decodedToken });
            }
        } catch (error) {
            console.error('Error rendering logout page:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async showLoginForm(req, res) {
        try {
            const token = req.session.token;
            const SITE_KEY = 'process.env.CAPTCHA_SITE_KEY'
            if (!token) {
                const decodedToken = false;
                return res.render('login', { message: req.flash('error'), decodedToken, siteKey: SITE_KEY });
            }
            else {
                const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
                return res.render("login", { decodedToken });
            }
        } catch (error) {
            console.error('Error rendering login page:', error);
            res.status(500).json({ message: 'Internal server error' });
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
            const user = await User.findOne({
                attributes: ['firstName', 'lastName', 'dateOfBirth', 'email', 'mobileNumber', 'gender', 'profilePhoto', 'religion', 'isVerified'],
                where: { id: id }
            });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const bio = await Bio.findOne({
                where: { user_id: id }
            });
            const addresses = await Addresses.findOne({
                where: { user_id: id }
            });
            const interests = await Interests.findOne({
                where: { user_id: id }
            });
            const education = await Education.findOne({
                where: { user_id: id }
            });
            const suggestions = await User.findAll();
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
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ message: 'Invalid token' });
            } else {
                return res.status(500).json({ message: 'Internal server error' });
            }
        }
    }

    static async editprofile(req, res) {
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
            const bio = await Bio.findOne({
                where: { user_id: id }
            });
            const addresses = await Addresses.findOne({
                where: { user_id: id }
            });
            const interests = await Interests.findOne({
                where: { user_id: id }
            });
            const education = await Education.findOne({
                where: { user_id: id }
            });
            const suggestions = await User.findAll();
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
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ message: 'Invalid token' });
            } else {
                return res.status(500).json({ message: 'Internal server hatt error' });
            }
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
            const user = await User.findOne({
                attributes: ['firstName', 'lastName', 'dateOfBirth', 'email', 'mobileNumber', 'gender', 'profilePhoto', 'religion'],
                where: { id: id }
            });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const id2 = req.params.id;

            const user2 = await User.findOne({
                attributes: ['firstName', 'lastName', 'dateOfBirth', 'email', 'mobileNumber', 'gender', 'profilePhoto', 'religion'],
                where: { id: id2 }
            });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const bio = await Bio.findOne({
                where: { user_id: id2 }
            });
            const addresses = await Addresses.findOne({
                where: { user_id: id2 }
            });
            const interests = await Interests.findOne({
                where: { user_id: id2 }
            });
            const education = await Education.findOne({
                where: { user_id: id2 }
            });
            const suggestions = await User.findAll();
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
            console.error('Error fetching profile:', error);
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ message: 'Invalid token' });
            } else {
                return res.status(500).json({ message: 'Internal server error' });
            }
        }
    }


    static async viewpayment(req, res) {
        try {
                res.render("payment");
        } catch (error) {
            console.error('Error rendering payyment:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = guestview;
