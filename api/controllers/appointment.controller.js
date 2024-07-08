import { db } from "../connect.js"
import jwt from "jsonwebtoken"
import twilio from 'twilio'

export const getAppointments = (req,res)=>{
    const patientId = req.query.patientId
    const doctorId = req.query.doctorId
    const token = req.cookies.accessToken

    if(!token) return res.status(401).json("Not logged In!")

    jwt.verify(token,"secretKey",(err,userInfo)=>{
        if(err) return res.status(403).json("Token is not valid")

        let q;
        let values;


        if(patientId !== undefined){
            q = `SELECT * FROM appointments WHERE patientid= ?`
            values = [patientId]
        }
        else if(doctorId !== undefined ){
            // console.log("ye chala");
            q = `SELECT * FROM appointments WHERE doctorid= ?`
            values = [doctorId]
        }
        else{
            q = `SELECT * FROM appointments `
            values = []
        }

        db.query(q,values,(err,data)=>{
            if(err)return res.status(500).json(err)
            return res.status(200).json(data)
        })
    })
}

export const getQueue = (req,res)=>{
    const patientId = req.query.patientId
    const doctorId = req.query.doctorId
    const token = req.cookies.accessToken

    if(!token) return res.status(401).json("Not logged In!")

    jwt.verify(token,"secretKey",(err,userInfo)=>{
        if(err) return res.status(403).json("Token is not valid")

        let q;
        let values;
        

        if(patientId!==undefined){
            q = `SELECT * FROM queue WHERE patientid= ?`
            values = [patientId]
        }
        else if(doctorId!==undefined){
            q = `SELECT * FROM queue WHERE doctorid= ?`
            values = [doctorId]
        }
        else{
            q = `SELECT * FROM queue `
            values = []
        }

        db.query(q,values,(err,data)=>{
            if(err)return res.status(500).json(err)
            return res.status(200).json(data)
        })
    })
}

export const bookAppointment = (req,res)=>{
    const token = req.cookies.accessToken;
    if(!token)return res.status(401).json("Not Logged In!")

    jwt.verify(token,"secretKey",(err,userInfo)=>{
        if(err)return res.status(403).json(err)

        const q = `SELECT * FROM doctortable WHERE doctorid=?`
        db.query(q,[req.body.doctorid],(err,data)=>{
            if(err)return res.status(500).json(err)

            let q;
            const patientid = userInfo.id
            const values = [
                req.body.doctorid,
                patientid,
                req.body.date,
                req.body.timeslot,
                req.body.isMember,
                req.body.memberId
            ]
            if(data[0].specialisation === "residential"){
                const member = req.body.isMember
                q = member===0? "INSERT INTO appointments (`doctorid`,`patientid`,`date`,`timeslot`) VALUES (?)" : "INSERT INTO appointments (`doctorid`,`patientid`,`date`,`timeslot`,`isMember`,`memberId`) VALUES (?)"
                db.query(q,[values],(err,data)=>{
                    if(err)return res.status(500).json(err)
                    return res.status(200).json("Your Appointment has been Booked")
                })
            }
            else{
                //here  with doctorid time and date
                const val = [
                    req.body.doctorid,
                    req.body.date,
                    req.body.timeslot
                ]
                const qu = `SELECT COUNT(*) AS count FROM appointments WHERE doctorid = ? AND date = ? AND timeslot = ?`
                db.query(qu,val,(err,data)=>{
                    if(err)return res.status(500).json(err)
                    let message;
                    
                    if(data[0].count < 1){
                        const member = req.body.isMember
                        q = member===0 ? "INSERT INTO appointments (`doctorid`,`patientid`,`date`,`timeslot`) VALUES (?)" : "INSERT INTO appointments (`doctorid`,`patientid`,`date`,`timeslot`,`isMember`,`memberId`) VALUES (?)"
                        message = "Your Appointment has been booked"
                    }
                    else{
                        const member = req.body.isMember
                        q = member===0? "INSERT INTO queue (`doctorid`,`patientid`,`date`,`timeslot`) VALUES (?)" : "INSERT INTO queue (`doctorid`,`patientid`,`date`,`timeslot`,`isMember`,`memberId`) VALUES (?)"
                        message = "Your Appointment is in waiting queue"
                    }
                    db.query(`SELECT dayvalue FROM doctoravaliablity WHERE doctorid = ?`,[req.body.doctorid],(err,data)=>{
                        let avaliable = false
                        const date = new Date(req.body.date)
                        for(let i=0;i<data.length;i++){
                            if(data[i].dayvalue === date.getDay() || data[i].dayvalue === 8) {
                                avaliable = true
                                break
                            }
                        }
                        if(avaliable){
                            db.query(q,[values],(err,data)=>{
                                if(err)return res.status(500).json(err)
                                return res.status(200).json(message)
                            })
                        }
                        else{
                            return res.status(200).json("Doctor not avaliable today")
                        }
                    })
                    // db.query(q,[values],(err,data)=>{
                    //     if(err)return res.status(500).json(err)
                    //     return res.status(200).json(message)
                    // })
                    
                })
            }
            
        })

    })
}

export const approveAppointment = (req,res)=>{
    const id = req.params.id
    const token = req.cookies.accessToken

    if(!token) return res.status(401).json("Not logged In!")

    jwt.verify(token,"secretKey",(err,userInfo)=>{
        if(err) return res.status(403).json("Token is not valid")

        db.query(`SELECT * FROM queue WHERE id = ?`,[id],(err,data)=>{
            if(err)return res.status(500).json(err)
            const values = [
                userInfo.id,
                data[0].patientid,
                data[0].date,
                data[0].timeslot,
                data[0].isMember,
                data[0].memberId
            ]
            const member = req.body.isMember
            const q = member===0? "INSERT INTO appointments (`doctorid`,`patientid`,`date`,`timeslot`) VALUES (?)" : "INSERT INTO appointments (`doctorid`,`patientid`,`date`,`timeslot`,`isMember`,`memberId`) VALUES (?)"
            db.query(q,[values],(err,data)=>{
                if(err)return res.status(500).json(err)
                db.query(`DELETE FROM queue WHERE id = ?`,[id],(err,data)=>{
                    if(err)return res.status(500).json(err)
                    return res.status(200).json("Appointment Approved")
                })
            })
        })
    })
}


export const withDrawAppointment = (req,res)=>{
    const id  = req.params.id
    
    const token = req.cookies.accessToken;
    if(!token)return res.status(401).json("Not Logged In!")

    jwt.verify(token,"secretKey",(err,userInfo)=>{
        if(err)return res.status(403).json(err)

        // const q1 = `SELECT * FROM appointments WHERE id=?`
        db.query(`SELECT * FROM appointments WHERE id = ?`,[id],(err,data)=>{
            if(err)return res.status(500).json(err)

            const deletedSlot = data[0].timeslot
            db.query(`DELETE FROM appointments WHERE id = ?`,[id],(err,data)=>{
                if(err)return res.status(500).json(err)

                db.query(`SELECT * FROM queue WHERE timeslot = ?`,[deletedSlot],(err,data)=>{
                    if(err)return res.status(500).json(err)

                    if(data.length>0){
                        const q  = data[0].isMember === 1 ? "INSERT INTO appointments (`doctorid`,`patientid`,`date`,`timeslot`,`isMember`,`memberId`) VALUES (?)" : "INSERT INTO appointments (`doctorid`,`patientid`,`date`,`timeslot`) VALUES (?)"
                        // const q = "INSERT INTO appointments (`doctorid`,`patientid`,`date`,`timeslot`,`isMember`,`memberId`) VALUES (?)"
                        // const date = data[0].date.toString().substring(0,10)
                        const values = [
                            data[0].doctorid,
                            data[0].patientid,
                            data[0].date,
                            data[0].timeslot,
                            
                        ]
                        const patientId = data[0].patientid
                        if(data[0].isMember === 1)values.push(data[0].isMember,data[0].memberId)
                        const queueId = data[0].id
                        db.query(q,[values],(err,data)=>{
                            if(err)return res.status(500).json(err)

                            db.query(`DELETE FROM queue WHERE id = ?`,[queueId],(err,data)=>{
                                if(err)return res.status(500).json(err)
                                db.query(`SELECT * FROM user WHERE id = ?`,[patientId],(err,data)=>{
                                    if(err)return res.status(500).json(err)
                                    
                                    const client = new twilio(process.env.SID,process.env.TWILIOW_AUTH_TOKEN)
                                    client.messages.create({body:"Your appointment has been scheduled",from : '+12513021961' ,to:data[0].phone})
                                    res.status(200).json("appointment deleted")
                                })
                            })
                        })
                    } else{
                        res.send("No item in waiting")
                    }
                })
            })
        })

    })
    
}

export const deletQueue = (req,res)=>{
    const id = req.params.id
    const token = req.cookies.accessToken

    if(!token) return res.status(401).json("Not logged In!")

    jwt.verify(token,"secretKey",(err,userInfo)=>{
        if(err) return res.status(403).json("Token is not valid")

        db.query(`DELETE FROM queue WHERE id = ?`,[id],(err,data)=>{
            if(err)return res.status(500).json(err)
            return res.status(200).json("Appointment removed from waiting list")
        })
    })
}

export const deleteAppointment = (req,res)=>{
    const id = req.params.id
    const token = req.cookies.accessToken

    if(!token) return res.status(401).json("Not logged In!")

    jwt.verify(token,"secretKey",(err,userInfo)=>{
        if(err) return res.status(403).json("Token is not valid")

        db.query(`DELETE FROM appointments WHERE id = ?`,[id],(err,data)=>{
            if(err)return res.status(500).json(err)
            return res.status(200).json("Appointment deleted")
        })
    })
}


export const getBookedTimeSlots = (req,res)=>{
    const date = req.params.date
    const token = req.cookies.accessToken

    // console.log("req made");

    if(!token) return res.status(401).json("Not logged In!")

    jwt.verify(token,"secretKey",(err,userInfo)=>{
        if(err) return res.status(403).json("Token is not valid")
//fetch acc to doc id also
        db.query(`SELECT timeslot FROM appointments WHERE date = ?`,[date],(err,data)=>{
            if(err)return res.status(500).json(err)
            const arrayOfTime = data.map(obj => obj.timeslot)
            return res.status(200).json(arrayOfTime)
        })
    })
}
