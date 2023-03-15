const express = require("express");
const app = express();
const mysql = require("mysql");


// 创建连接
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"nodemysql"
})
db.connect( (err) => {
    if(err) throw err;
    console.log('连接成功');
})
// 创建数据库
app.get("/createdb",(req,res) => {
    let sql = "CREATE DATABASE nodemysql";
    db.query(sql,(err,result) => {
        if(err){
            console.log(err);
        }else{
            console.log(result);
            res.send("Datebase create success...")
        }
    })
})

//  创建表
app.get("/createpoststable",(req,res) => {
    //  创建表 表名为posts id自增 title字符串长度255 body字符串255 主键是ID
    let sql = "CREATE TABLE posts(id int AUTO_INCREMENT,title VARCHAR(255),body VARCHAR(255),PRIMARY KEY(ID))";
    db.query(sql,(err,result) => {
        if(err){
            console.log(err);
        }else{
            console.log(result);
            res.send("posts表创建成功....")
        }
    })
})

// 插入数据
app.get("/addpost2",(req,res) => {
    let post = {title:"post two",body:"weasth"};
    let sql = "INSERT INTO posts SET ?";
    db.query(sql,post,(err,result) => {
        if(err){
            console.log(err);
        }else{
            console.log(result);
            res.send("post2 added....")
        }
    })
})
// 查询内容
app.get("/getposts",(req,res) => {
    let sql = "SELECT * FROM posts";
    db.query(sql,(err,result) => {
        if(err){
            console.log(err);
        }else{
            console.log(result);
            // res.send("查询成功")
            res.json(result)
        }
    })
})

// 查询单条内容
app.get("/getposts/:id",(req,res) => {
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    db.query(sql,(err,result) => {
        if(err){
            console.log(err);
        }else{
            console.log(result);
            res.json(result)
        }
    })
})
// 更新内容
app.get("/updatepost/:id",(req,res) => {
    let newTitle = "update title";
    let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    db.query(sql,(err,result) => {
        if(err){
            console.log(err);
        }else{
            console.log(result);
            res.send(`update ${req.params.id} success....`)
        }
    })
})

// 删除内容
app.get("/deletepost/:id",(req,res) => {
    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
    db.query(sql,(err,result) => {
        if(err){
            console.log(err);
        }else{
            console.log(result);
            res.send("删除成功.....")
        }
    })
})

app.listen(3000, () => {
    console.log("服务器开启在3000端口....");
})