import mysql from "mysql"

export const db = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "Jai@0710",
   database: "healthcarenitk" 
})