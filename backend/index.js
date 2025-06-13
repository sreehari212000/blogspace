import express from "express";
import mongoose from "mongoose";
import postRoutes from "./routes/post.js"
import userRoutes from "./routes/user.js"
import multer from "multer";
import errorHandler from "./middlewares/error.js"
import path from "path"
import { fileURLToPath } from "url";
const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'images')
    },
    filename: (req, file, cb)=>{
        cb(null, Date.now()+"-"+file.originalname)
    }
})
// middlewares
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(multer({storage}).single('image'))
app.use('/images',express.static(path.resolve('images')))
// middleware to handle cors error
app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})
// routes
app.use('/api/posts', postRoutes)
app.use('/api/users', userRoutes)
// app.use('/api/comments')
app.use(errorHandler)
const PORT = 8000
mongoose.connect('mongodb://127.0.0.1:27017/blogspace')
.then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server started on http://localhost:${PORT}`); 
    })
})
.catch((e)=>{
    console.log('Database error: ', e);
})