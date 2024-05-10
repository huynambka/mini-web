const router = require('express').Router();

const { createPost, getPost, getPublicPost } = require('../controllers/posts');

router.post('/create', createPost);
router.get('/:id', getPost);
router.get('/', getPublicPost);

module.exports = router;
