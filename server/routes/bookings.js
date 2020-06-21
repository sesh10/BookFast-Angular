const express = require('express');
const router = express.Router();

const UserCtrl = require('../controllers/user');
const BookCtrl = require('../controllers/booking');

router.post('', UserCtrl.authMiddleware, BookCtrl.createBooking);

module.exports = router;