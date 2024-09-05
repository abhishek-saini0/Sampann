const User = require('../models/users');
const registrationOtp = require('../models/registrationOtp');
const Bio = require('../models/bio');
const Education = require('../models/education');
const Interests = require('../models/interests');
const Addresses = require('../models/addresses');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const otpGenerator = require('otp-generator');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const express = require('express');
const flash = require('express-flash');
const axios = require('axios');
const app = express();
const stripe = require('stripe')('sk_test_51PrC84Rpo9MfeTbXLz2sYNuH8zt1KM7SVE9UyPYTKBEoAnyT3MTukKyoQ6VCHMveykkWfWqvJYuMgqlCXbl0B3Uz00VXewiOGl');
app.use(flash());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "abhishek331saini@gmail.com",
        pass: "xyxc stdv zkvz pphy",
    },
});

class UserController {
    static async signup(req, res) {
        try {
            const existingUser = await User.findOne({
                where: {
                    email: req.body.email
                }
            });
            if (existingUser) {
                req.flash('error', 'user already exist pelese login or try another email to signup');
                return res.redirect('/signup');
            }
            const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                mobileNumber: req.body.mobileNumber,
                dateOfBirth: req.body.dateOfBirth,
                gender: req.body.gender,
                religion: req.body.religion,
                profilePhoto: req.file ? req.file.filename : null,
            });
            console.log(req.file ? req.file.path : 'No file uploaded');
            user.password = bcrypt.hashSync(req.body.password, 10);
            const otp = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
            const userOtp = new registrationOtp({
                email: req.body.email,
                otp: otp
            });
            req.session.user = user;
            req.session.save();
            await userOtp.save();
            const info = await transporter.sendMail({
                from: 'abhishek331saini@gmail.com',
                to: req.body.email,
                subject: 'Verification for Sampann Registration',
                html: `Hi ${req.body.firstName} ${req.body.lastName}! Your OTP for verification to register 
                with Sampann is: <b>${otp}</b>. Please don't share it with others.`,
            });
            res.redirect("/signup/otpvarification");
        } catch (error) {
            console.error('Signup error:', error);
            res.status(500).json({
                message: 'Internal server error'
            });
        }
    }

    static async Otpvarification(req, res) {
        try {
            const userSessionData = req.session.user;
            const userOtp = await registrationOtp.findOne({
                where: { email: userSessionData.email },
                order: [['created_at', 'DESC']]
            });

            if (userOtp && userOtp.otp === req.body.otp) {
                const userdata = new User({
                    firstName: userSessionData.firstName,
                    lastName: userSessionData.lastName,
                    email: userSessionData.email,
                    mobileNumber: userSessionData.mobileNumber,
                    dateOfBirth: userSessionData.dateOfBirth,
                    gender: userSessionData.gender,
                    password: userSessionData.password,
                    religion: userSessionData.religion,
                    profilePhoto: userSessionData.profilePhoto,
                });
                await userdata.save();

                const user = await User.findOne({
                    where: { email: userSessionData.email }});
                const tokenPayload = {
                    id: user.id,
                    email: user.email,
                };
                const token = jwt.sign(tokenPayload, config.jwt.secret, { expiresIn: '10h' });
                req.session.token = token;
                res.redirect('/profile');


            } else {
                req.flash('error', 'The entered OTP is incorrect.');
                return res.redirect('/signup/otpvarification');
            }
        } catch (error) {
            console.error('OTP verification error:', error);
            res.status(500).json({
                message: 'Internal server error'
            });
        }
    }

    static async login(req, res) {
        try {
            const user = await User.findOne({
                where: { email: req.body.email }
            });
            if (!user) {
                req.flash('error', 'User does not exist. Try another account or register.');
                return res.redirect('/login');
            }
            const captcha = req.body['g-recaptcha-response'];
            if (!captcha) {
                req.flash('error', 'Please complete the CAPTCHA.');
                return res.redirect('/login');
            }
            const secret_key = '6Lc8SzEqAAAAALzsUmXnzkmVmV6mB302Uyo7Yoif';
            const captchaResponse = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
                params: {
                    secret: secret_key,
                    response: captcha,
                }
            });

            if (!captchaResponse.data.success) {
                req.flash('error', 'CAPTCHA verification failed. Please try again.');
                return res.redirect('/login');
            }
            const isValidate = await bcrypt.compare(req.body.password, user.password);
            if (isValidate) {
                const tokenPayload = {
                    id: user.id,
                    email: user.email,
                };
                const token = jwt.sign(tokenPayload, config.jwt.secret, { expiresIn: '10h' });
                req.session.token = token;
                res.redirect('/profile');
            } else {
                req.flash('error', 'Incorrect password');
                return res.redirect('/login');
            }
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({
                message: 'Internal server error'
            });
        }
    }

    static async editprofile(req, res) {
        try {
            const token = req.session.token;
            console.log(token);
            if (!token) {
                return res.status(401).json({ message: 'No token provided' });
            }
            const decodedToken = jwt.verify(token, config.jwt.secret);
            const id = decodedToken.id;
            const bio = await Bio.findOne({
                where: { user_id: id }
            });
            if (!bio) {
                const userbio = new Bio({
                    aboutMe: req.body.aboutMe,
                    tagline: req.body.tagline,
                    user_id: id,
                });
                await userbio.save();
            }
            else {
                await Bio.update(
                    {
                        aboutMe: req.body.aboutMe,
                        tagline: req.body.tagline,
                    },
                    { where: { user_id: id } });
            }
            const interests = await Interests.findOne({
                where: { user_id: id }
            });
            if (!interests) {
                const userinterests = new Interests({
                    interest1: req.body.interest1,
                    interest2: req.body.interest2,
                    interest3: req.body.interest3,
                    user_id: id,
                });
                await userinterests.save();
            }
            else {
                await Interests.update({
                    interest1: req.body.interest1,
                    interest2: req.body.interest2,
                    interest3: req.body.interest3,
                },
                    { where: { user_id: id } });
            }
            const education = await Education.findOne({
                where: { user_id: id }
            });
            if (!education) {
                const usereducation = new Education({
                    education: req.body.education,
                    occupation: req.body.occupation,
                    user_id: id,
                });
                await usereducation.save();
            }
            else {
                await Education.update({
                    education: req.body.education,
                    occupation: req.body.occupation,
                },
                    { where: { user_id: id } });
            }
            const addresses = await Addresses.findOne({
                where: { user_id: id }
            });
            if (!addresses) {
                const useraddresses = new Addresses({
                    street: req.body.street,
                    city: req.body.city,
                    state: req.body.state,
                    postal_code: req.body.postalCode,
                    country: req.body.country,
                    user_id: id,
                });
                await useraddresses.save();
            }
            else {
                await Addresses.update({
                    street: req.body.street,
                    city: req.body.city,
                    state: req.body.state,
                    postal_code: req.body.postalCode,
                    country: req.body.country,
                },
                    { where: { user_id: id } });
            }
            res.redirect('/profile');
        }
        catch (error) {
            console.error('error in edit:', error);
            res.status(500).json({
                message: 'Internal server error'
            });
        }
    }

    static async logout(req, res) {
        req.session.destroy(err => {
            if (err) {
                console.error('Error destroying session:', err);
                return res.status(500).json({ message: 'Error logging out' });
            }
            res.redirect('/sampann');
        });
    }

    static async pyament(req, res) {
        try {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [{
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Sampann',
                        },
                        unit_amount: 20220,
                    },
                    quantity: 1,
                }],
                mode: 'payment',
                success_url: 'http://localhost:8080/success',
                cancel_url: 'http://localhost:8080/cancel',
            });
            res.redirect(session.url);
        } catch (error) {
            console.error('Error creating checkout session:', error);
            res.status(500).send('Internal Server Error');
        }
    };

    static async success(req, res) {
        const token = req.session.token;
        const decodedToken = jwt.verify(token, config.jwt.secret);
        const id = decodedToken.id;

        await User.update(
            { isVerified: true },
            { where: { id: id } }
        );

        const user = await User.findOne({
            where: { id: id }
        });
        res.render('paymentsuccess', {
            user: user || [],
        });
    }

    static async cancel(req, res) {
        const token = req.session.token;
        const decodedToken = jwt.verify(token, config.jwt.secret);
        const id = decodedToken.id;

        const user = await User.findOne({
            where: { id: id }
        });
        res.render('paymentcancel', {
            user: user || [],
        });
    }
}

module.exports = UserController;