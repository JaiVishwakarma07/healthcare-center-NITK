import express from "express"
import { updateMedicine ,addMedicine} from "../controllers/pharmacy.controller.js"

const router = express.Router()

router.put("/:id", updateMedicine)
router.post("/",addMedicine);



export default router