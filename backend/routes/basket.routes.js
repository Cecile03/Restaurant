const express = require('express');
const router = express.Router();
const authentification = require('../middlewares/authentification.middleware')
// Controller
const {getAllBasket, getBasketById, updateBasket, addBasket, deleteBasket} = require('../controllers/basket.controllers.js');
// Sub routes
router.get('/', getAllBasket);
router.get('/:id?', authentification, getBasketById);
router.put('/:id?', authentification, updateBasket);
router.post('/', authentification, addBasket);
router.delete('/:id?', authentification, deleteBasket);

module.exports = router;