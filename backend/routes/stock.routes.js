const express = require('express');
const router = express.Router();

const { getAllStock, getStockById, deleteStock, addStock, updateStock } = require('../controllers/stock.controllers.js');

router.get('/', getAllStock);
router.get('/:id?', getStockById);
router.delete('/:id?', deleteStock);
router.put('/:id?', updateStock);
router.post('/', addStock);



module.exports = router;