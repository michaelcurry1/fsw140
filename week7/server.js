const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
// Set Up Basic Express Server 
const app = express();
app.use(cors());
app.use(express.json());

// esstablist a handshake with my MySql server
const db = mysql.createConnection(
{
    host: 'localhost',
    user: 'root',
    password: '',
    //connect to default database
    database: '09Sep2021'
});

//capture errors, if any
db.connect((err) => {
    if (err){
        throw err;
    } 
    console.log("connection to MySQL Server Established Successfully!")
    });



//Create an empty database
app.get('/createDB',(req, res) => {
    let myQuery = "CREATE DATABASE 09Sep2021";
    db.query(myQuery, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result);
        res.send("09Sep2021 Database created successfully"); 
    });
});

//Create A New Table
app.get('/createTable',(req, res) => {
    let myQuery = "CREATE TABLE postings (id INT auto_increment, title VARCHAR(100), message VARCHAR(250), PRIMARY KEY (id))";
    db.query(myQuery, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result);
        res.send("postings Table created successfully"); 
    });
});

//Insert Row-1
app.post('/post', (req, res) =>{
    let post = {title: req.body.title, message:req.body.message};
    let myQuery = "INSERT INTO postings SET? ";
    //Run sql Command
    db.query(myQuery, post, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result);
        res.send("First Row Inserted Successfully");
    });
});

//Insert Row-2
app.get('/insertRow2', (req, res) =>{
    let post = {title: 'Second Post', message: 'This is my second post via a route.'};
    let myQuery = "INSERT INTO postings SET? ";
    //Run sql Command
    db.query(myQuery, post, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result);
        res.send("Second Row Inserted Successfully");
    });
});

//Execute a Select Query
app.get('/post',(req, res) => {
    let myQuery = "SELECT * FROM postings";
    db.query(myQuery, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result);
        res.send(result); 
    });
});

//Execute a UPDATE Query
app.put('/post/:id', (req, res) => {
    let newTitle = req.body.title;
    let myQuery = `UPDATE postings SET title = '${newTitle}' WHERE ID = ${req.params.id}`;

    db.query(myQuery, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result);
        //res.send("UPDATE Query executed successfully"); 
    });

    let newMessage = req.body.message;
    let myQuery2 = `UPDATE postings SET message = '${newMessage}' WHERE ID = ${req.params.id}`;

    db.query(myQuery2, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result);
        res.send("UPDATE Query executed successfully"); 
    });
});

// Execute a DELETE Query
app.delete('/post/:id', (req, res) => {
  let myQuery = `DELETE  FROM postings WHERE ID = ${req.params.id}`;

    db.query(myQuery, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result);
        res.send("DELETE Query executed successfully"); 
    });
});




//Open Up Port and Listen for a connection request
app.listen('9000', () => {
    console.log("Local Web Server is up and Running!");
});