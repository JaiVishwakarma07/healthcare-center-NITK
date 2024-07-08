import express from "express"
import {
    getAppointments, 
    bookAppointment, 
    withDrawAppointment, 
    getQueue, 
    deletQueue, 
    deleteAppointment, 
    approveAppointment, 
    getBookedTimeSlots
} from "../controllers/appointment.controller.js"

const router = express.Router()

router.get("/", getAppointments)
router.post("/book", bookAppointment)
router.delete("/withdraw/:id", withDrawAppointment)
router.get("/queue", getQueue)
router.delete("/queue/:id", deletQueue)
router.delete("/:id", deleteAppointment)
router.post("/approve/:id", approveAppointment)
router.get("/timeslots/:date", getBookedTimeSlots)


export default router