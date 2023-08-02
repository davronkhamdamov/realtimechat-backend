import asyncHandler from 'express-async-handler';
import Chat from '../models/chatModel.js'
import User from '../models/UserModel.js';

const accessChat = asyncHandler(async (req, res) => {
    const { userId } = req.body
    if (!userId) {
        console.log('UserId param not send with request');
        return res.sendStatus(400)
    }
    let isChat = await Chat.find({
        isGroupChat: false, $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ]
    }).populate("users", '-password').populate("latestMessage")

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email"
    })
    if (isChat.length > 0) {
        res.send(isChat[0])
    } else {
        let chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId]
        }
        try {
            const createdChat = await Chat.create(chatData)
            const fullChat = await Chat.findOne({ _id: createdChat.id }).populate('users', '-password')
            res.status(200).send(fullChat)
        } catch (error) {
            res.status(400)
            throw new Error(error.message)
        }
    }
})
const fetchChats = asyncHandler(async (req, res) => {
    try {
        Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate('users', '-password')
            .populate("groupAdmin", '-password')
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
            .then(async (results) => {
                results = await User.populate(results, {
                    path: "latestMessage.sender",
                    select: "name pic email"
                })
                res.status(200).send(results)
            })
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

const createGroupChat = asyncHandler(async (req, res) => {
    if (!req.body.users || !req.body.name) {
        return res.status(400).send({ message: "Please Fill all the feilds" })
    }
    let users = JSON.parse(req.body.users)
    if (users.length < 2) {
        return res.status(400).send('More than 2 users are required to from a group chat')
    }
    users.push(req.user)
    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users,
            isGroupChat: true,
            groupAdmin: req.user
        })
        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate("users", '-password')
            .populate("groupAdmin", '-password')
        res.send(fullGroupChat)
    } catch (error) {

    }
})
const renameGroup = asyncHandler(async (req, res) => {
    const { chatId, chatName } = req.body
    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        { chatName },
        { new: true },
    )
        .populate("users", '-password')
        .populate("groupAdmin", '-password')
    if (!updatedChat) {
        res.status(404)
        throw new Error("Chat not found")
    } else {
        res.send(updatedChat)
    }
})
const addToGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body
    const added = await Chat.findByIdAndUpdate(chatId,
        { $push: { users: userId }, },
        { new: true }
    ).populate('users', '-password')
        .populate("groupAdmin", "-password")
    if (!added) {
        res.status(404)
        throw new Error("Chat not found")
    } else {
        res.send(added)
    }
})
const removedFromGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body
    const removed = await Chat.findByIdAndUpdate(chatId,
        { $pull: { users: userId }, },
        { new: true }
    ).populate('users', '-password')
        .populate("groupAdmin", "-password")
    if (!removed) {
        res.status(404)
        throw new Error("Chat not found")
    } else {
        res.send(removed)
    }
})
export {
    accessChat,
    fetchChats,
    createGroupChat,
    renameGroup,
    addToGroup,
    removedFromGroup
}