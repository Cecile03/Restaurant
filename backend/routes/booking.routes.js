const express = require('express');
const router = express.Router();
const authentification = require('../middlewares/authentification.middleware')
// Controller
const {getAllBooking, getBookingById, updateBooking, addBooking, deleteBooking} = require('../controllers/booking.controllers.js');
// Sub routes
router.get('/', getAllBooking);
router.get('/:id?', authentification, getBookingById);
router.put('/:id?', authentification, updateBooking);
router.post('/', authentification, addBooking);
router.delete('/:id?', authentification, deleteBooking);

module.exports = router;