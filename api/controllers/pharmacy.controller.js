import { db } from "../connect.js"
import jwt from "jsonwebtoken"

export const addMedicine = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not Logged In!");

    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(403).json("token is not valid");
        const q = "INSERT INTO pharmacy (`medicationName`,`description`,`quantity`,`status`) VALUES (?)"
        const status = 'avaliable'
        const values = [
            req.body.medicationName,
            req.body.description,
            req.body.quantity,
            status
        ]
        db.query(q,[values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("updated");
        })
    })
}

export const updateMedicine = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not Logged In!");

    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(403).json("token is not valid");
        const quantity = parseInt(req.body.quantity)
        let status = 'not avaliable'
        const updateQuery = 'UPDATE pharmacy SET quantity = ?, status = ? WHERE id = ?';
        if(quantity>0)status = 'avaliable'
        const updateValues = [
            quantity,
            status,
            req.params.id
        ];
        db.query(updateQuery,updateValues, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("updated");
        })
    })
}