import { db } from "../connect.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = (req, res) => {
    //check if user exist

    const q = "SELECT * FROM user WHERE id = ?"

    db.query(q, [req.body.id], (err, data) => {
        if (err) return res.status(500).json(err)
        if (data.length) return res.status(409).json("User already Exists!")
        //create new if not
        //hash the pass
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt)
        const q = "INSERT INTO user (`id`,`email`,`name`,`phone`,`address`,`city`,`state`,`pincode`,`country`,`photo`,`idproof`,`age`,`gender`,`userType`,`password`) VALUES (?)"
        const values = [
            req.body.id,
            req.body.email,
            req.body.name,
            req.body.phone,
            req.body.address,
            req.body.city,
            req.body.state,
            req.body.pincode,
            req.body.country,
            req.body.photo,
            req.body.idproof,
            req.body.age,
            req.body.gender,
            req.body.userType,
            hashedPassword
        ]
        db.query(q, [values], (err, data) => {
            //console.log(hashedPassword);
            if (err) return res.status(500).json(err)
            console.log(data);
            if(req.body.specialisation !== undefined){
                const v = [req.body.id,req.body.specialisation]
                db.query("INSERT INTO doctortable (`doctorid`,`specialisation`) VALUES (?)",[v],(err,data)=>{
                    if (err) return res.status(500).json(err)
                    return res.status(200).json("User has been created");
                })
            }
            else return res.status(200).json("User has been created");
        });
    })
}

export const login = (req, res) => {
    const q = "SELECT * FROM user WHERE id = ?"
    db.query(q, [req.body.id], (err, data) => {
        if (err) return res.status(500).json(err)
        if (data.length === 0) return res.status(404).json("User not found");

        const checkPassword = bcrypt.compareSync(req.body.password, data[0].password)
        if (!checkPassword)
            return res.status(400).json("Wrong password or id")

        const token = jwt.sign({ id: data[0].id ,userType: data[0].userType}, "secretKey");
        const { password, ...others } = data[0];

        res.cookie("accessToken", token, {
            httpOnly: true,
        }).status(200).json(others);
    })
}

export const logout = (req, res) => {
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none"
    }).status(200).json("User has been logged out")
}