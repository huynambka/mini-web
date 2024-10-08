require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

const passport = require('./middlewares/passport');
app.use(passport.initialize());

const postRouter = require('./routes/posts');
const authRoutes = require('./routes/auth');
app.use(express.static('public'));

app.use('/api/v1/post', postRouter);
app.use('/api/v1/auth', authRoutes);
const start = async () => {
    try {
        // Connect DB
        const { url } = require('./config/db.config');
        const mongoose = require('mongoose');
        mongoose
            .connect(url)
            .then(() => {
                console.log('Connected to the database!');
            })
            .catch((err) => {
                console.log('Cannot connect to the database!', err);
                process.exit();
            });
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
