const express = require('express');
const router = express.Router();
const authentification = require('../middlewares/authentification.middleware')
// Controller
const {getAllTable, getTableById, updateTable, addTable, deleteTable} = require('../controllers/table.controllers.js');
// Sub routes
router.get('/', getAllTable);
router.get('/:id?', authentification, getTableById);
router.put('/:id?', authentification, updateTable);
router.post('/', authentification, addTable);
router.delete('/:id?', authentification, deleteTable);

module.exports = router;