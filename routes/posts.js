const router = require('express').Router();

const { createPost, getPost } = require('../controllers/posts');

router.post('/create', createPost);
router.get('/:id', getPost);

module.exports = router;
