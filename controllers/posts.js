const Post = require('../models/posts');

const { StatusCodes } = require('http-status-codes');

const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        // Auto increment postId
        const lastPost = await Post.findOne().sort({ postId: -1 });
        let id = 1;
        if (lastPost) {
            id = lastPost.postId + 1;
        }
        const post = await Post.create({ id, title, content });
        res.status(StatusCodes.CREATED).json({ success: true, post });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: error.message,
        });
    }
};

const getPost = async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Post.find({ postId: id });
        if (post.length == 0) {
            return res.status(StatusCodes.NOT_FOUND).json({
                error: `Post with id ${id} not found`,
            });
        }
        res.status(StatusCodes.OK).json({ success: true, post });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: error.message,
        });
    }
};

module.exports = {
    createPost,
    getPost,
};
