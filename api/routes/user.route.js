import express from "express"
import { getFacultyMemebers, getUser } from "../controllers/user.controller.js"

const router = express.Router()

router.get("/find/:userId", getUser)
router.get("/find/facultymembers/:userId", getFacultyMemebers)

export default router