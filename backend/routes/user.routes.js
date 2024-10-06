const express = require('express');
const router = express.Router();
const authentification = require('../middlewares/authentification.middleware')
// Controller
const {getAllUser, getUserById, deleteUser, updateUser, addUser, login} = require('../controllers/user.controllers');
// Sub routes
router.get('/', authentification, getAllUser);
router.get('/:id?', authentification, getUserById);
router.delete('/:id?', authentification, deleteUser);
router.put('/:id?', authentification, updateUser);
router.post('/', addUser);
router.post('/login', login);
// Export
module.exports = router;  