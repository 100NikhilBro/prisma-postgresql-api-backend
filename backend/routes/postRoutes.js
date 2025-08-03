const express = require('express');
const { createPost, updatePost, getPost, deletePost } = require('../controllers/postControllers');
const router = express.Router();


router.post('/create', createPost);
router.put('/update/:id', updatePost);
router.get('/get/:id', getPost);
router.delete('/delete/user/:id/posts/:pid', deletePost)

module.exports = router;