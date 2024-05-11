const router = require('express').Router();
const passport = require('../middlewares/passport');
const passportJWT = passport.authenticate('jwt', { session: false }, null);

const { createPost, getPost, getPublicPost } = require('../controllers/posts');

router.post('/create', passportJWT, createPost);
router.get('/:id', passportJWT, getPost);
router.get('/', passportJWT, getPublicPost);

module.exports = router;
