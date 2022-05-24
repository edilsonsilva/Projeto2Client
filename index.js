const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
const auth = require("./middleware/jwt_verify");

const app = express();
app.use(express.json());

const cx = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Alunos@123",
    database:"outrobanco",
    port:"3306",
});

cx.connect((erro,data)=>{
    if(error) return console.error(`Connection server is fail -> ${error}`);
    console.log(`Connection information -> ${cx.threadId}`);
});

app.post("/api/cliente/add",auth,(req,res)=>{
    cx.query("insert into tbcliente set ? ",req.body,(error,result)=>{
        if(error) return res.status(500).send({output:`Error at insertion -> ${error}`});
        res.status(201).send({output:`Client inserted`,payload:result});
    });
});
app.listen(5532,()=>console.log("Servidor on-line at port 5532"))