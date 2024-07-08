import { db } from "../connect.js"
import jwt from "jsonwebtoken"


export const getMember = (req, res) => {
    const token = req.cookies.accessToken;
    const id = req.params.id

    if (!token) return res.status(401).json("Not Logged In!");

    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(403).json("token is not valid");

        db.query(`SELECT * FROM facultymembers WHERE id = ?`,[id], (err, data) => {
            if (err) return res.status(500).json(err);
            // console.log(id);
            return res.status(200).json(data[0]);
        })
    })
}

export const getMembers = (req, res) => {
    const token = req.cookies.accessToken;
    const id = req.params.id

    if (!token) return res.status(401).json("Not Logged In!");

    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(403).json("token is not valid");

        db.query(`SELECT * FROM facultymembers WHERE facultyid = ?`,[id], (err, data) => {
            if (err) return res.status(500).json(err);
            // console.log(id);
            return res.status(200).json(data);
        })
    })
}

export const addMember = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not Logged In!");

    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(403).json("token is not valid");

        const q = "INSERT INTO facultymembers (`facultyid`,`name`,`id`,`phone`,`email`,`age`,`gender`) VALUES (?)"
        const values = [
            req.body.facultyid,
            req.body.name,
            req.body.id,
            req.body.phone,
            req.body.email,
            req.body.age,
            req.body.gender
        ]
        // console.log(req.body);

        db.query(q,[values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Member has been added");
        })
    })
}


export const deleteMember = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not Logged In!");

    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(403).json("token is not valid");

        const values = [
            req.query.name,
            req.query.id
        ]

        db.query(`DELETE FROM appointments WHERE name = ? AND facultyid = ? `,[values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Member has been removed");
        })
    })
}

export const updatemember = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not Logged In!");

    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(403).json("token is not valid");

        const values = [
            req.body.name,
            req.body.idproof,
            req.body.phone,
            req.body.email,
            req.body.age,
            req.body.gender,
            req.params.id
        ]

        const q = "UPDATE facultymembers SET `name`=?,`idproof`=?,`phone`=?,`email`=?,`age`=?, `gender`=? WHERE id=?"

        db.query(q,[values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Member has been updated");
        })
    })
}