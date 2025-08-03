const express = require('express');
const { createComment, updateComment, getCommentonPost, deleteComment } = require('../controllers/commentControllers');
const router = express.Router();


router.post('/create/:id/:pid', createComment);
router.put('/update/:id/:pid/:cid', updateComment);
router.get('/get/:pid', getCommentonPost);
router.delete('/delete/:id/:pid/:cid', deleteComment);


module.exports = router;