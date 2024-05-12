const Post = require('../models/post');

const { StatusCodes } = require('http-status-codes');

const createPost = async (req, res) => {
    try {
        const username = req.user.username;
        const { title, content, public } = req.body;
        // Auto increment postId
        const lastPost = await Post.findOne().sort({ postId: -1 });
        let id = 1;
        if (lastPost) {
            id = lastPost.postId + 1;
        }
        const post = await Post.create({
            postId: id,
            title,
            content,
            author: username,
            public,
        });
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
        const username = req.user.username;
        const post = await Post.findOne({ postId: id });
        if (!post || (!post.public && post.author !== username)) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
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
    const username = req.user.username;
    const posts = await Post.find({
        $or: [{ public: true }, { author: username }],
    })
        .select('postId title')
        .sort({ createdAt: -1 });
    res.status(StatusCodes.OK).json({ success: true, posts });
};
module.exports = {
    createPost,
    getPost,
    getPublicPost,
};
