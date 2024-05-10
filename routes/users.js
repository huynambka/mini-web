const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/users');

const passport = require('../middlewares/passport');
const passportJWT = passport.authenticate('jwt', { session: false }, null);
