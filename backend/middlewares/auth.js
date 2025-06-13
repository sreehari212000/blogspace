import jwt from "jsonwebtoken"
import User from "../models/user.js"
const SECRETKEY = "secret@123"
export const checkAuth = async (req, res, next) =>{
    if(!req.headers.authorization){
        const error = new Error("You are not authenticated")
        error.statusCode = 401
        return next(error)
    }
    try {        
        const token = req.headers.authorization.split(' ')[1]        
        const decodedtoken = jwt.verify(token, SECRETKEY)
        const user = await User.findById(decodedtoken.userId).select("-password")
        if(!user){
            const error = new Error("Token is not valid")
            error.statusCode = 401
            throw error
        }
        req.user = user
        next()
    } catch (error) {
        error.statusCode = error.statusCode || 500
        next(error)
    }
}