import { db } from "../connect.js"
import jwt from "jsonwebtoken"

export const getSpecialisation = (req,res)=>{
    const token = req.cookies.accessToken
    if(!token) return res.status(401).json("Not logged In!")

    jwt.verify(token,"secretKey",(err,userInfo)=>{
        if(err) return res.status(403).json("Token is not valid")

        db.query(`SELECT DISTINCT specialisation FROM doctortable`,(err,data)=>{
            if(err)return res.status(500).json(err)
            return res.status(200).json(data)
        })
    })
}

export const getDoctorThroughSpec = (req,res)=>{
    const token = req.cookies.accessToken
    if(!token) return res.status(401).json("Not logged In!")

    jwt.verify(token,"secretKey",(err,userInfo)=>{
        if(err) return res.status(403).json("Token is not valid")

        const q = `SELECT u.* , d.specialisation FROM user AS u JOIN doctortable as d ON (u.id = d.doctorid) WHERE specialisation = ?`
        // console.log(req.body.specialisation);
        db.query(q,[req.params.specialisation],(err,data)=>{
            if(err)return res.status(500).json(err)
            return res.status(200).json(data)
        })
    })
}

export const getAllDoctors = (req,res)=>{
    const token = req.cookies.accessToken
    if(!token) return res.status(401).json("Not logged In!")

    jwt.verify(token,"secretKey",(err,userInfo)=>{
        if(err) return res.status(403).json("Token is not valid")

        const q = `SELECT u.*,d.specialisation FROM user AS u JOIN doctortable AS d ON (u.id = d.doctorid) WHERE u.userType = 'doctor'`
        // console.log(req.body.specialisation);
        db.query(q,(err,data)=>{
            if(err)return res.status(500).json(err)
            return res.status(200).json(data)
        })
    })
}

export const getDoctor = (req,res)=>{
    const token = req.cookies.accessToken
    if(!token) return res.status(401).json("Not logged In!")

    jwt.verify(token,"secretKey",(err,userInfo)=>{
        if(err) return res.status(403).json("Token is not valid")

        const q = `SELECT u.* , d.specialisation FROM user AS u JOIN doctortable as d ON (u.id = d.doctorid) WHERE id = ?`
        // console.log(req.body.specialisation);
        db.query(q,[req.params.id],(err,data)=>{
            if(err)return res.status(500).json(err)
            return res.status(200).json(data[0])
        })
    })
}

export const getDoctorAvaliability = (req,res)=>{
    const token = req.cookies.accessToken
    if(!token) return res.status(401).json("Not logged In!")

    const doctorid = req.params.id
    // console.log(doctorid);

    jwt.verify(token,"secretKey",(err,userInfo)=>{
        if(err) return res.status(403).json("Token is not valid")

        const q = `SELECT dayvalue FROM doctoravaliablity WHERE doctorid = ?`

        db.query(q,[doctorid],(err,data)=>{
            if(err)return res.status(500).json(err)
            // let avaliable = false
            // const date = new Date()
            // for(let i=0;i<data.length;i++){
            //     if(data[i].dayvalue === date.getDay() || data[i].dayvalue === 8) {
            //         avaliable = true
            //         break
            //     }
            // }
            const arrayOfDays = data.map(obj => obj.dayvalue)
            // console.log(arrayOfDays);
            return res.status(200).json(arrayOfDays)
            // else return res.status(200).json("No Doctor is Avaliable Today")
        })
    })
}
export const getDoctorDays = (req,res)=>{
    const token = req.cookies.accessToken
    if(!token) return res.status(401).json("Not logged In!")

    const doctorid = req.params.id

    jwt.verify(token,"secretKey",(err,userInfo)=>{
        if(err) return res.status(403).json("Token is not valid")

        const q = `SELECT * FROM doctoravaliablity WHERE doctorid = ?`

        db.query(q,[doctorid],(err,data)=>{
            if(err)return res.status(500).json(err)
            return res.status(200).json(data)
        })
    })
}

export const deleteDoctorDays = (req,res)=>{
    const token = req.cookies.accessToken
    if(!token) return res.status(401).json("Not logged In!")

    const id = req.params.id

    jwt.verify(token,"secretKey",(err,userInfo)=>{
        if(err) return res.status(403).json("Token is not valid")

        const q = `DELETE FROM doctoravaliablity WHERE id = ?`

        db.query(q,[id],(err,data)=>{
            if(err)return res.status(500).json(err)
            return res.status(200).json("deleted")
        })
    })
}


export const getDoctorTimeSlots = (req,res)=>{
    const token = req.cookies.accessToken
    if(!token) return res.status(401).json("Not logged In!")

    const doctorid = req.params.id
    // console.log("reqmade");

    jwt.verify(token,"secretKey",(err,userInfo)=>{
        if(err) return res.status(403).json("Token is not valid")

        const q = `SELECT * FROM doctortimeavaliability WHERE doctorid = ?`

        // console.log(doctorid);
        db.query(q,[doctorid],(err,data)=>{
            if(err)return res.status(500).json(err)
            // let avaliable = false
            // const date = new Date()
            // for(let i=0;i<data.length;i++){
            //     if(data[i].dayvalue === date.getDay() || data[i].dayvalue === 8) {
            //         avaliable = true
            //         break
            //     }
            // }
            // console.log(data);
            // const arrayOfDays = data.map(obj => obj.timeslot)
            // console.log(arrayOfDays.sort());
            // console.log(data);
            return res.status(200).json(data)
            // else return res.status(200).json("No Doctor is Avaliable Today")
        })
    })
}

export const deleteDoctorTimeSlots = (req,res)=>{
    const token = req.cookies.accessToken
    if(!token) return res.status(401).json("Not logged In!")

    const id = req.params.id

    jwt.verify(token,"secretKey",(err,userInfo)=>{
        if(err) return res.status(403).json("Token is not valid")

        const q = `DELETE FROM doctortimeavaliability WHERE id = ?`

        db.query(q,[id],(err,data)=>{
            if(err)return res.status(500).json(err)
            return res.status(200).json("deleted")
        })
    })
}

async function insertDayData(id,days) {
    // console.log(days);
    try {
        for (let obj of days) {
            // Construct your query with placeholders for values
            const query = "INSERT INTO doctoravaliablity (`doctorid`,`dayvalue`) VALUES (?)";
            const values = [id,obj];

            // Execute the query
            await new Promise((resolve, reject) => {
                db.query(query, [values], (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        }

        // console.log('Data inserted successfully');
    } catch (err) {
        console.error('Error inserting data:', err);
    }
}

export const setDoctorDays = (req,res)=>{
    const token = req.cookies.accessToken
    if(!token) return res.status(401).json("Not logged In!")

    jwt.verify(token,"secretKey",(err,userInfo)=>{
        if(err) return res.status(403).json("Token is not valid")
        insertDayData(req.params.id,req.body.days)
    })
}

async function insertTimeSlotData(id,timeslots) {
    // console.log(timeslots);
    try {
        for (let obj of timeslots) {
            // Construct your query with placeholders for values
            const query = "INSERT INTO doctortimeavaliability (`doctorid`,`timeslot`) VALUES (?)";
            const values = [id,obj];

            // Execute the query
            await new Promise((resolve, reject) => {
                db.query(query, [values], (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        }

        // console.log('Data inserted successfully');
    } catch (err) {
        console.error('Error inserting data:', err);
    }
}

export const setDoctorTimeSlots = (req,res)=>{
    const token = req.cookies.accessToken
    if(!token) return res.status(401).json("Not logged In!")


    jwt.verify(token,"secretKey",(err,userInfo)=>{
        if(err) return res.status(403).json("Token is not valid")
        insertTimeSlotData(req.params.id,req.body.timeslots)
    })
}


