import { db } from "../connect.js"
import jwt from "jsonwebtoken"

export const getUser = (req, res) => {
    const userId = req.params.userId
    const q = "SELECT * FROM user WHERE id=?";
    // console.log(userId)

    db.query(q, [userId], (err, data) => {
        if (err) return res.status(500).json(err);
        const { password, ...info } = data[0];
        return res.json(info);
    })
}

export const getFacultyMemebers = (req, res) => {
    const userId = req.params.userId
    const token = req.cookies.accessToken

    if(!token) return res.status(401).json("Not logged In!")
    const q = "SELECT * FROM facultymembers WHERE facultyid=?";
    
    jwt.verify(token,"secretKey",(err,userInfo)=>{
        if(err) return res.status(403).json("Token is not valid")

        db.query(q, [userId], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.json(data);
        })
    }) 
}



// export const getUser = (req, res) => {
//     const userId = req.params.userId
//     const q = "SELECT id FROM user WHERE country=?";

//     db.query(q, [userId], (err, data) => {
//         if (err) return res.status(500).json(err);
//         // const { password, ...info } = data[0];
//         return res.json(data);
//     })
// }