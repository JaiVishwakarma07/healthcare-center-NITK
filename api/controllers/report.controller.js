import moment from "moment/moment.js";
import { db } from "../connect.js"
import jwt from "jsonwebtoken"


export const getReport = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not Logged In!");

    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(403).json("token is not valid");

        if(userInfo.userType === 'patient' || userInfo.userType === 'Faculty'){
            // console.log("req made");
            db.query(`SELECT * FROM medicalreport  WHERE patientid = ? `,[userInfo.id], (err, data) => {
                if (err) return res.status(500).json(err);
                return res.status(200).json(data);
            })
        }
        else{
            const values = [
                userInfo.id,
                req.query.patientid
            ]
            db.query(`SELECT * FROM medicalreport WHERE doctorid=? AND patientid=?`,[values], (err, data) => {
                if (err) return res.status(500).json(err);
                return res.status(200).json(data);
            })
        }
    })
}

export const getReportById = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not Logged In!");

    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(403).json("token is not valid");

        db.query(`SELECT * FROM medicalreport WHERE id=?`,[req.params.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        })
    })
}

async function insertMedicineData(id,formFieldsMeds) {
    // console.log(formFieldsMeds);
    try {
        for (let obj of formFieldsMeds) {
            // Construct your query with placeholders for values
            const query = "INSERT INTO medicineallocation (`reportid`,`medicineid`,`dosage`,`days`) VALUES (?)";
            const values = [id,parseInt(obj.medicine), obj.dosage,obj.days];

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

async function insertTestData(id,formTestFeilds) {
    try {
        for (let obj of formTestFeilds) {
            // Construct your query with placeholders for values
            const query = "INSERT INTO test (`reportid`,`test`) VALUES (?)";
            const values = [id,obj.test];

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

export const addReport = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not Logged In!");

    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(403).json("token is not valid");
        const date = moment().format('YYYY-MM-DD')
        const time = moment().format('HH:mm')

        let q ;
        let values = [
            userInfo.id,
            req.body.patientid,
            req.body.diagnosis,
            req.body.remarks,
            date,
            time
        ]
        if(req.body.isMember === 0) {
            q = "INSERT INTO medicalreport (`doctorid`,`patientid`,`diagnosis`,`remarks`,`date`,`time`) VALUES (?)"
        }
        else {
            q = "INSERT INTO medicalreport (`doctorid`,`patientid`,`diagnosis`,`remarks`,`date`,`time`,`isMember`,`memberid`) VALUES (?)"
            values.push(req.body.isMember)
            values.push(req.body.memberid)
        }

        db.query(q,[values], (err, data) => {
            if (err) return res.status(500).json(err);
            insertMedicineData(data.insertId,req.body.filterMeds)
            insertTestData(data.insertId,req.body.formTestFields)
            return res.status(200).json("Report added");
        })
    })
}