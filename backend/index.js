// need to npm install these dependencies first
const express = require("express")
const app = express()
const cors = require("cors")
const mysql = require("mysql2");

// dependency for .env file
require('dotenv').config()

// use cors for cross-origin between frontend and backend
app.use(cors())

// middleware function for json data parsing
app.use(express.json())

// initialize the mysql connection
// const db = mysql.createPool({
//     host: process.env.MYSQLHOST,
//     user: process.env.MYSQLUSER,
//     password: process.env.MYSQLPASSWORD,
//     database: process.env.MYSQLDATABASE,
//     port: process.env.MYSQLPORT,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// });

const db = mysql.createConnection(`mysql://${MYSQLUSER}:${MYSQLPASSWORD}@${MYSQLHOST}:${MYSQLPORT}/${MYSQLDATABASE}`)

// route for getting all the data
app.get("/", (req, res) => {
    const sql = "SELECT * FROM student"
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data)
    })
})

// route for getting a single data
app.get("/:id", (req, res) => {
    const sql = "SELECT * FROM student WHERE ID = ?"

    const id = req.params.id;

    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
})

// route for posting a data
app.post("/new_student", (req, res) => {
    const sql = "INSERT INTO student (`Name`, `Email`) VALUES (?)"
    const values = [
        req.body.name,
        req.body.email
    ]
    db.query(sql, [values], (err, data) => {
        if(err) return res.json(err);
        return res.json(data)
    })
})

// route for updating a data
app.put("/update_student/:id", (req, res) => {
    const sql = "UPDATE student SET `Name` = ?, `Email` = ? WHERE ID = ?"
    const values = [
        req.body.name,
        req.body.email
    ]

    // gets the id from the url
    const id = req.params.id

    db.query(sql, [...values, id], (err, data) => {
        if(err) return res.json(err);
        return res.json(data)
    })
})

app.delete("/delete_student/:id", (req, res) => {
    const sql = "DELETE FROM student WHERE ID = ?"

    // gets the id from the url
    const id = req.params.id

    db.query(sql, [id], (err, data) => {
        if(err) return res.json(err);
        return res.json(data)
    })
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

