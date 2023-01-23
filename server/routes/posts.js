import express, { Router } from 'express'
import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js'

const postRouter = express.Router()

postRouter.get('/', getPosts);
postRouter.post('/', createPost);
postRouter.patch('/:id', updatePost);
postRouter.delete("/:id", deletePost);
postRouter.patch('/:id/likedPost', likePost);


export default postRouter;