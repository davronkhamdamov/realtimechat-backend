import mongoose from 'mongoose'

const MessageModel = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: { type: String, trim: true },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat"
    }
}, {
    timestamps: true
})
const message = mongoose.model("Message", MessageModel)
export default message