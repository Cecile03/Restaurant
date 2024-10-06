const express = require('express');
const router = express.Router();
const authentification = require('../middlewares/authentification.middleware')
// Controller
const {getAllOrder, getOrderById, updateOrder, addOrder, deleteOrder} = require('../controllers/order.controllers.js');
// Sub routes
router.get('/', getAllOrder);
router.get('/:id?', authentification, getOrderById);
router.put('/:id?', authentification, updateOrder);
router.post('/', authentification, addOrder);
router.delete('/:id?', authentification, deleteOrder);

module.exports = router;