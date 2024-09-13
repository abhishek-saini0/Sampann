const express = require('express');
const guestview = require('../controllers/guestview');
 const userview = require('../controllers/userview');
const auth = require('../controllers/auth');
const isRegistered = require('../middlewares/isregistered');
const router = express.Router();
const config = require('../config/config');
const jwt = require('jsonwebtoken');
const multer = require('multer');

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'views/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Async handler to catch errors
const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Public routes
router.get("/", asyncHandler(guestview.homepage));
router.get("/about", asyncHandler(guestview.about));
router.get("/help", asyncHandler(guestview.help));
router.get("/signup", asyncHandler(guestview.showSignup));
router.post("/signup", upload.single('file'), asyncHandler(auth.signup));
router.get("/signup/otpvarification", isRegistered, asyncHandler(guestview.showOtpForm));
router.post("/signup/otpvarification", asyncHandler(auth.Otpvarification));
router.get("/login", asyncHandler(guestview.showLoginForm));
router.post("/login", asyncHandler(auth.login));

// Authentication middleware
router.use((req, res, next) => {
    try {
        const token = req.session.token;
        if (!token) {
            return res.redirect('/login'); // Return to prevent further execution
        }
        jwt.verify(token, process.env.JWT_SECRET_KEY);
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        return res.redirect('/login'); // Return to prevent further execution
    }
});

// Protected routes
router.get('/profile', asyncHandler(guestview.profile));
router.get('/editprofile', asyncHandler(guestview.editprofile));
router.post('/editprofile', asyncHandler(auth.editprofile));
router.get('/logout', asyncHandler(guestview.logout));
router.post('/logout', asyncHandler(auth.logout));
router.get('/match/:id', asyncHandler(guestview.match));
router.get('/payment', asyncHandler(guestview.viewpayment));
router.post('/payment', asyncHandler(auth.
    pyament));
router.get('/success', asyncHandler(auth.success));
 router.get('/edituser', asyncHandler(userview.viewedituser));
 router.post('/edituser', upload.single('file'), asyncHandler(userview.edituser));



 
 router.get('/chat',asyncHandler(userview.viewchat));
 router.post('/chat',asyncHandler(userview.chat));

// Error handling middleware
router.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ message: 'Internal server error' });
});

module.exports = router;
