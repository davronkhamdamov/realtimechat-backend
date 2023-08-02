import { Router } from 'express'
import { protect } from '../middleware/authMiddleware.js'
import { accessChat, createGroupChat, fetchChats, renameGroup, removedFromGroup } from '../controller/chatControllers.js'
const router = Router()


router.route("/").post(protect, accessChat)
router.route("/").get(protect, fetchChats)
router.route("/group").post(protect, createGroupChat)
router.route("/rename").put(protect, renameGroup)
router.route("/groupadd").put(protect, addToGroup)
router.route("/groupremove").put(protect, removedFromGroup)

export default router