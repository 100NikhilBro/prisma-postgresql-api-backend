const express = require('express');
const { createUser, updateUser, getUser, getAllUser, deleteUser, deleteAllUser } = require('../controllers/userController');
const router = express.Router();

router.post('/create', createUser);
router.put('/update/:id', updateUser);
router.get('/get/:id', getUser);
router.get('/get', getAllUser);
router.delete('/delete/:id', deleteUser)
router.delete('/delete', deleteAllUser)

module.exports = router;