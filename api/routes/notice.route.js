import express from "express"
import {getNotices, deleteNotice, updateNotice,addNotice, getNoticeLimit } from "../controllers/notice.controller.js"

const router = express.Router()

router.get("/", getNotices)
router.get("/limit", getNoticeLimit)
router.delete("/:id", deleteNotice)
router.put("/:id", updateNotice)
router.post("/", addNotice)


export default router