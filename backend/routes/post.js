import express from "express";
import Post from "../models/post.js";
import { checkAuth } from "../middlewares/auth.js";
const router = express.Router()
router.get('/', async (req, res, next)=>{
    try {
        const posts = await Post.find({}).populate('author')
        res.status(200).json({msg: "Successs", posts})
        
    } catch (error) {
        error.statusCode = error.statusCode || 500
        next(error)
    }
    
})
router.post('/', checkAuth, async (req, res, next)=>{
    if(!req.body.title || !req.body.content){
        const error = new Error('Please fill in all the required fields!')
        error.statusCode = 400
        return next(error)
    }
    try {
        const result = await Post.create({
            content: req.body.content,
            title: req.body.title,
            imageUrl: req.file.path,
            author: req.user._id
        })
        console.log(res);
        res.status(200).json({status: 'Success', message: result})
    } catch (error) {
        error.statusCode = error.statusCode || 500
        next(error)
    }
})
router.get('/:postId', async(req, res, next)=>{
    const postId = req.params.postId
    try {
        const post = await Post.findById(postId).populate({path: 'author', select:"-password"})
        if(!post){
            const er = new Error("Could not find post!")
            er.statusCode = 404
            return next(er)
        }
        res.status(200).json({status: "Success", post})
        
    } catch (error) {
        error.statusCode = error.statusCode || 500
        next(error)
    }
})
export default router