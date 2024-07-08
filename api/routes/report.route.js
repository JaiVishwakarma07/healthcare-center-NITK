import express from "express"
import { getReport,addReport, getReportById } from "../controllers/report.controller.js"

const router = express.Router()

router.get("/", getReport)
router.get("/byid/:id", getReportById)
router.post("/", addReport)

export default router