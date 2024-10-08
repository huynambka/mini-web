const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
        postId: {
            type: Number,
            required: [true, 'A post must has a postId'],
            unique: true,
        },
        title: {
            type: String,
            required: [true, 'A post must has a title'],
            trim: true,
            maxlength: [100, 'A post title must be less than 100 characters'],
        },
        author: {
            type: String,
            ref: 'User',
            required: [true, 'A post must has an author'],
        },
        content: {
            type: String,
            required: [true, 'A post must has a content'],
            trim: true,
        },
        public: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema);
