import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import appointmentRoutes from "./routes/appointment.route.js";
import doctorRoutes from "./routes/doctor.route.js"
import reportRoutes from "./routes/report.route.js"
import facultyRoutes from './routes/faculty.route.js'
import medicineRoutes from './routes/medicineallot.route.js'
import pharmacyRoutes from './routes/pharmacy.route.js'
import noticeRoutes from './routes/notice.route.js'
import dotenv from 'dotenv'
import { db } from "./connect.js";


const app = express()

dotenv.config()
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
})
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173"
}))
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/appointment", appointmentRoutes)
app.use("/api/doctor", doctorRoutes)
app.use("/api/report", reportRoutes)
app.use("/api/faculty", facultyRoutes)
app.use("/api/medicine", medicineRoutes)
app.use("/api/pharmacy", pharmacyRoutes)
app.use("/api/notice", noticeRoutes)

db.connect((err)=>{
    if(err){
        console.log("Error in Connecting SQL Server");
    }
    else{
        console.log("Connected to SQL Database");
        // const createTableQueries = [
        //     `
        //         CREATE TABLE IF NOT EXISTS dummy (
        //             id INT AUTO_INCREMENT PRIMARY KEY,
        //             title VARCHAR(100) NOT NULL,
        //             content TEXT,
        //             user_id INT
        //         )
        //     `,
        //     // Add more create table queries as needed
        // ];
        // createTableQueries.forEach((query) => {
        //     db.query(query, (err, result) => {
        //         if (err) {
        //             console.error('Error creating table: ', err);
        //             return;
        //         }
        //         console.log('Table created successfully!');
        //     });
        // });
    }
})

app.listen(3000, () => {
    console.log("API working")
})

