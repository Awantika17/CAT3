const express = require('express')
const app = express()
var cors = require('cors')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const port = 3000
const hostname = 'localhost'

const db = "INFOSYS"
const tbl = "SPRING"

app.use(cors())

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));

var corsOptions = {
    origin: '*',
    methods: "GET",
    optionsSuccessStatus: 200 
}

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: db
});

connection.connect((err) => {
    if (err)
        throw (err)
    console.log("MySql Connected")
})

app.get('/', (req, res) => {
    res.status(200)
    res.setHeader('Content-Type', 'application/json')
    connection.query("SELECT * from " + tbl, function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify(result));
        res.end(JSON.stringify(result))
    });
})

app.post('/new', (req,res) => {
    res.status(200)
    res.setHeader('Content-Type', 'application/json')
    var resp = req.body
    console.log(resp['id'])
    connection.query("INSERT into " + tbl + " VALUES (" + resp['Emp_ID'] + ",\'" + resp['Emp_Name'] + "\',\'" + resp['Emp_Designation'] + "\',\'" + resp['Emp_Department'] + "\'," + resp['Emp_Salary'] + ",\'" + resp['Emp_Location'] + "\')", function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify(result));
        res.end(JSON.stringify(result))
    });
})

app.post('/update', (req,res) => {
    res.status(200)
    res.setHeader('Content-Type', 'application/json')
    var resp = req.body
    console.log(resp['id'])
    connection.query("UPDATE " + tbl + " SET Emp_Name= \'" + resp['Emp_Name'] + "\', Emp_Designation=\'" + resp['Emp_Designation'] + "\',Emp_Department=\'" + resp['Emp_Department'] + "\',Emp_Salary=" + resp['Emp_Salary'] + ",Emp_Location=\'" + resp['Emp_Location'] + "\' where Emp_ID = " + resp['Emp_ID'], function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify(result));
        res.end(JSON.stringify(result))
    });
})

app.post('/search', (req, res) => {
    res.status(200)
    res.setHeader('Content-Type', 'application/json')
    var getStatus = req.body
    connection.query("SELECT * from " + tbl + " where Emp_Designation = \'" + getStatus['Emp_Designation'] + "\'", function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify(result));
        res.end(JSON.stringify(result))
    });
})

app.post('/delete', (req,res) => {
    res.status(200)
    res.setHeader('Content-Type', 'application/json')
    var delId = req.body['delID']

    connection.query("DELETE from " + tbl + " where id = " + delId, function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify(result));
        res.end(JSON.stringify(result))
    });
})

app.get('/*', (req, res) => {
    res.status(404)
    res.end("<h1>404 Error</h1>")
})
app.listen(port, hostname, () => {
    console.log(`App listening at http://${hostname}:${port}`)
})