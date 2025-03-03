import mongoose from "mongoose"

const CommentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    }
}, {timestamps: true})
const Comment = mongoose.model('comment', CommentSchema)
export default Comment