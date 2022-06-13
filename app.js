//jshint esversion:6
require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const ejs  = require('ejs');
const mysql = require('mysql');
const bcrypt = require('bcrypt')



const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user:process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
});

db.connect(err=>{
    if(err){
        throw err
    }
    console.log("Database connected");
});

const app = express();
const port = process.env.PORT || 3000;
const bCrypt = ""
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

// app.get('/createdb',(req,res)=>{
//     let sql = 'create database itemstructure'
//     let query = db.query(sql,err=>{
//         if(err){
//             throw err
//         }
//         console.log("database created")
//     })
// })

app.get('/createtable',(req,res)=>{
    let sql = 'create table user(id int auto_increment, username varchar(30), pword varchar(30), primary key(id));'
    let query = db.query(sql,err=>{
        if(err){
            throw err
        }
        console.log("table created")
    })
})


app.get('/',(req,res)=>{
    res.render('home');
});

app.get('/login',(req,res)=>{
    res.render('login');
});

app.post('/login',(req,res)=>{

        username =req.body.username,
        password =req.body.password
        let sql = `select * from user where username= "${username}" and pword= "${password}"`
        let query = db.query(sql,err=>{
            if(err){
                throw err
            }
            res.render('secrets')
        })
    })

app.get('/register',(req,res)=>{
    res.render('register');
});


app.post('/register',(req,res)=>{
    bCrypt =  bcrypt.hash(req.body.password)
    const newUser = {
       username: req.body.username,
       pword: bCrypt
    }
    let sql = 'insert into user set ?'
    let query = db.query(sql,newUser,err=>{
        if(err){
            throw err
        }
        res.render('secrets')
    })


})





app.listen(port,()=>{
    console.log(`Server running on port: "${port}"`);
});