import express from "express"
import User from "../models/user.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { checkAuth } from "../middlewares/auth.js"
const SECRETKEY = "secret@123"

const router = express.Router()

router.post('/signup', async(req, res, next)=>{
    const {name, email, password} = req.body
    if(!name || !email || !password){
        const error = new Error("Please fill in all the fields")
        error.statusCode = 401
        return next(error)
    }
    try {
        const user = await User.create({
            name,
            email,
            password
        })
        res.status(200).json({status: 'Ok', user});
        
    } catch (error) {
        error.statusCode = error.statusCode || 500
        next(error)
    }
    
})

router.post('/signin', async(req, res, next)=>{
    const {email, password} = req.body
    console.log(req.body);
    
    if(!email || !password){
        const error = new Error('Please fill in all the fields')
        error.statusCode = 401
        return next(error)
    }
    try {
        const user = await User.findOne({email: email})
        console.log(user);
        if(!user){
            const error = new Error('User does not exist')
            error.statusCode = 401
            throw error
        }
        const isPasswordMatching = await bcrypt.compare(password, user.password)
        if(!isPasswordMatching){
            const error = new Error("Wrong password!")
            error.statusCode = 401
            throw error
        }
        const payload = {email: user.email, userId: user._id.toString()}
        const token = jwt.sign(payload, SECRETKEY, {expiresIn:'1h'})
        res.status(200).json({status: 'Ok',token, userId: user._id.toString()})
    } catch (error) {
        error.statusCode = error.statusCode || 500
        next(error)
    }

})

router.get('/profile', checkAuth,async(req, res, next)=>{
    res.json({status: "Ok", user: req.user})
})



export default router