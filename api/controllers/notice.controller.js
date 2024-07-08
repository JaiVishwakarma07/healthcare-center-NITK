import { db } from "../connect.js"
import jwt from "jsonwebtoken"
import moment from "moment/moment.js";



export const getNotices = (req, res) => {
    db.query(`SELECT * FROM noticetable `, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    })
}



export const getNoticeLimit = (req, res) => {
    db.query(`SELECT * FROM noticetable ORDER BY id DESC LIMIT 5`, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    })
}

export const deleteNotice = (req, res) => {
    db.query(`DELETE FROM noticetable WHERE id = ?`, [req.params.id],(err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Notice Deleted");
    })
}

export const updateNotice = (req, res) => {
    const date = moment().format('YYYY-MM-DD')
    const notice = req.body.notice
    const id = req.params.id
    const values = [
        notice,
        date,
        id
    ]
    const q = "UPDATE noticetable SET notice = ?, date = ? WHERE id = ?"
    db.query(q, values,(err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Notice updated");
    })
}

export const addNotice = (req, res) => {
    const date = moment().format('YYYY-MM-DD')
    const values = [
        req.body.notice,
        date,
    ]
    db.query("INSERT INTO noticetable (`notice`,`date`) VALUES (?)", [values],(err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Notice added");
    })
}