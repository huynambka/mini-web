const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'A user must have a username'],
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'A user must have a password'],
            trim: true,
        },
        posts: [
            {
                type: Number,
                ref: 'Post',
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
