import express from "express"
import {getMember, addMember, deleteMember,updatemember, getMembers } from "../controllers/faculty.controller.js"

const router = express.Router()

router.get("/:id", getMember)
router.get("/all/:id", getMembers)
router.post("/", addMember)
//use query as locahost:3000/api/facultymembers?name=Name&id=ID
router.delete("/", deleteMember)
router.put("/:id",updatemember)

export default router