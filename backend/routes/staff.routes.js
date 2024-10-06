const express = require('express');
const router = express.Router();
const authentification = require('../middlewares/authentification.middleware')
// Controller
const {getAllStaff, getStaffById, deleteStaff, updateStaff, addStaff, login} = require('../controllers/staff.controllers');
// Sub routes
router.get('/', getAllStaff);
router.get('/:id?', authentification, getStaffById);
router.delete('/:id?', authentification, deleteStaff);
router.put('/:id?', authentification, updateStaff);
router.post('/', authentification, addStaff);
router.post('/login', login);                 
// Export
module.exports = router;