const { response } = require('express');
const express = require('express');
const app = express();
const mysql = require('mysql2');


// board에 저장을 위한 pool 생성
const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.DATABASE_PASSWORD,
    database: 'bulletin_practice',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
const promisePool = pool.promise();

exports.postData = async (req, res) => {
    console.log('boad애서 저장하러 들어옴');
    console.log(req.body);
    const body = req.body;
    const result = await saveData(body);
    res.json({
        result: result,
        status: 200,
    })
}

// Posted 된 데이터를 가져온다.

exports.getPostedData = async (req, res) => {
    const data = await getData();
    res.json({
        postedData: data,
        status: 200
    });
}

const getData = async (req, res) => {
    console.log('getPostedData 들어옴');
    const QUERY = 'SELECT * FROM facebookBoard';
    const [rows] = await promisePool.query(QUERY);
    return rows
}

const saveData = async (body) => {
    const { username, message, imageURL, profilePic } = body;
    console.log('username: ' + username + 'message: ' + message);
    const QUERY = `INSERT INTO facebookBoard (username, message, timestamp, profilePic, imageURL) VALUES (?,?, current_timestamp(), ?, ?)`;
    const [rows] = await promisePool.query(QUERY, [username, message, profilePic, imageURL])
    return rows;
}
