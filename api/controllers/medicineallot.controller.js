import { db } from "../connect.js"
import jwt from "jsonwebtoken"


//transfer this one to pharmacy controller

export const getMedicine = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not Logged In!");

    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(403).json("token is not valid");

        db.query(`SELECT * FROM pharmacy`, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        })
    })
}

export const getAllotments = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not Logged In!");

    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(403).json("token is not valid");

        const q = `SELECT r.patientid,r.memberid, m.reportid, GROUP_CONCAT(CONCAT(m.medicineid, ':', m.alloted, ':', m.dosage, ':', m.days, ':', m.id)) AS data FROM medicineallocation m JOIN medicalreport r ON m.reportid = r.id GROUP BY m.reportid`

        db.query(q, (err, data) => {
            if (err) return res.status(500).json(err);

            //save data and execute another request for patientid and report id
            // db.query(`SELECT patientid FROM medicalreport WHERE id=?`,[])

            const formattedResults = data.map(row => {
                let completed = 1
                return {
                  patientid : row.patientid,
                  memberid : row.memberid,
                  reportid: row.reportid,
                  data: row.data.split(',')
                    .map(entry => {
                      const [medicineid, alloted, dosage, days, id] = entry.split(':');
                      let totalRequired = 1 ;
                      const [m,d,e] = dosage.split('-')
                      if(d!==undefined && e!== undefined){
                        let mor = parseInt(m),day=parseInt(d),eve=parseInt(e)
                        if(m === '1/4')mor = 0.25
                        else if(m === '1/2')mor = 0.5
                        if(d === '1/4')day = 0.25
                        else if(d === '1/2')day = 0.5
                        if(e === '1/4')eve = 0.25
                        else if(e === '1/2')eve = 0.5
                        totalRequired = (mor+eve+day)*parseInt(days)
                      }  
                      if(parseInt(alloted) === 0)completed = 0
                      return { medicineid, alloted, dosage, days , id, totalRequired};
                    }),
                    allotmentCompleted : completed
                };
              });
            return res.status(200).json(formattedResults);
        })
    })
}

//update allotment
//add the feature to check medicine is avaliable or not and after allotment decrease the number from pharmacy table
export const updateAllotment = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not Logged In!");

  jwt.verify(token, "secretKey", (err, userInfo) => {
      if (err) return res.status(403).json("token is not valid");
      //403 error semd

      db.query(`SELECT p.quantity FROM pharmacy p JOIN medicineallocation m ON p.id = m.medicineid WHERE m.id = ?`,[req.params.id],(err,data)=>{
        if(err)return res.status(500).json(err);
        if(data[0].quantity > 0){
          const q = "UPDATE medicineallocation SET alloted = ? WHERE id = ?"
          const id = req.params.id
          const value = 1
    
          db.query(q,[value,id], (err, data) => {
              if (err) return res.status(500).json(err);
              db.query(`SELECT * FROM medicineallocation WHERE id = ?`,[id],(err,data)=>{
                if (err) return res.status(500).json(err);
                let totalRequired = 1 ;
                const dosage = data[0].dosage
                const [m,d,e] = dosage.split('-')
                if(d!==undefined && e!== undefined){
                  let mor = parseInt(m),day=parseInt(d),eve=parseInt(e)
                  if(m === '1/4')mor = 0.25
                  else if(m === '1/2')mor = 0.5
                  if(d === '1/4')day = 0.25
                  else if(d === '1/2')day = 0.5
                  if(e === '1/4')eve = 0.25
                  else if(e === '1/2')eve = 0.5
                  totalRequired = (mor+eve+day)*parseInt(data[0].days)
                }
                db.query(`UPDATE pharmacy SET quantity = quantity - ${totalRequired} WHERE id = ?`,[data[0].medicineid],(err,data)=>{
                  if (err) return res.status(500).json(err);
                  db.query(`UPDATE pharmacy SET status = 'Not Avaliable' WHERE quantity <= 0`,(err,data)=>{
                    if (err) return res.status(500).json(err);
                    return res.status(200).json("Allocation done has been updated");
                  })
                })
              })
          })
        }
        else res.status(403).json("Medicine is Out of Stock")
      })


      //
  })
}


export const getTests = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not Logged In!");

  jwt.verify(token, "secretKey", (err, userInfo) => {
      if (err) return res.status(403).json("token is not valid");

      db.query(`SELECT * FROM test WHERE reportid = ?`, [req.params.id],(err, data) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json(data);
      })
  })
}
