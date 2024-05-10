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
        const post = await Post.create({ postId: id, title, content });
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
        const post = await Post.findOne({ postId: id });
        if (!post) {
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
const getPublicPost = async (req, res) => {
    const posts = await Post.find({ public: true }).select('postId title');
    res.status(StatusCodes.OK).json({ success: true, posts });
};
module.exports = {
    createPost,
    getPost,
    getPublicPost,
};
