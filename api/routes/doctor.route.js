import express from "express"
import {getSpecialisation, getDoctor,getDoctorAvaliability,getDoctorThroughSpec, getAllDoctors, getDoctorTimeSlots, setDoctorDays, setDoctorTimeSlots
,deleteDoctorTimeSlots ,getDoctorDays,deleteDoctorDays} from "../controllers/doctor.controller.js"

const router = express.Router()

router.get("/specialisation", getSpecialisation)
router.get("/:specialisation", getDoctorThroughSpec)
router.get("/avaliability/:id", getDoctorAvaliability)
router.get("/avaliability/time/:id", getDoctorTimeSlots)
router.get("/find/:id", getDoctor)
router.get("/", getAllDoctors)
router.get('/days/:id',getDoctorDays)
router.post("/days/:id",setDoctorDays)
router.post("/timeslots/:id",setDoctorTimeSlots)
router.delete("/timeslots/:id",deleteDoctorTimeSlots)
router.delete("/days/:id",deleteDoctorDays)





export default router