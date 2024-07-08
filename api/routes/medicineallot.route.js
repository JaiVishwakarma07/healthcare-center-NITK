import express from "express"
import { getAllotments, getMedicine, getTests, updateAllotment } from "../controllers/medicineallot.controller.js"

const router = express.Router()

router.get("/", getMedicine)
router.get("/tests/:id", getTests)
router.get("/allotments",getAllotments)
router.put("/allot/:id",updateAllotment)



export default router