import express, { Router } from 'express'
import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js'
import auth from '../middleware/auth.js';

const postRouter = express.Router()

postRouter.get('/', getPosts);
postRouter.post('/', auth, createPost);
postRouter.patch('/:id', auth, updatePost);
postRouter.delete("/:id", auth, deletePost);
postRouter.patch('/:id/likepost', auth, likePost);


export default postRouter;