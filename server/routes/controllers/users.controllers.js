
const { User } = require('../getCustomers');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // hash 로 salting 해서 password를 암호화하여 저장하기 위한 API 호출
const emailVerify = require('../controllers/emailVerification.controllers');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
require('dotenv').config();

const YOUR_SECRET_KEY = process.env.SECRET_KEY;
const mysql = require('mysql2');


// 로그인을 위한 pool 생성
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






exports.createToken = async (req, res, next) => {
    try {
        console.log(req.body);
        Object.keys(req.body).length === 0 && res.json({
            msg: 'Please enter username and password !!',
            state: 410,
        })
        const { username, password } = req.body;

        const getUserDataFromDB = async (username) => {
            const QUERY = "SELECT nickname,password, email FROM leaguelogin where username =?";
            const [rows] = await promisePool.query(QUERY, username);
            console.log('rows: ' + rows);
            return rows.length == 0 ? 0 : rows;
        }

        const userDataFromDB = await getUserDataFromDB(username);
        console.log(userDataFromDB + '   dbdb');



        userDataFromDB === 0 && res.json({ msg: `Username doesn't exsists`, status: 450 })
        const passwordHash = userDataFromDB[0].password;
        const nickname = userDataFromDB[0].nickname;
        const email = userDataFromDB[0].email;
        console.log('email: ' + email)

        const isAuthenticated = await bcrypt.compare(password, passwordHash);
        console.log('isAuthenticated: ' + isAuthenticated)

        if (isAuthenticated) {
            const token = jwt.sign({
                user_id: username
            }, YOUR_SECRET_KEY, {
                expiresIn: '20s'
            });

            res.cookie('token', token, { httpOnly: true, maxAge: 3000 });
            console.log('cookie 저장된것: ' + req.cookies);

            res.json({
                result: 'Success',
                token: token,
                msg: "Logged in successfully",
                nickname: nickname,
                email: email,
                state: 200,
            });
            console.log(token);
        } else {
            res.json({ msg: "Password is not correct", state: 400 });
        }

    } catch (err) {
        console.error(err);
        next(err);
    }

}

exports.getCookie = async (req, res) => {
    console.log('getcookie 들어왔다.');
    res.send('token: ' + req.cookies.token);
}


exports.createNewUser = async function (req, res, next) {
    const body = req.body;
    console.log(body);
    const saltRounds = 10; //hash 의 알고리즘이 공개되어있기때문에 취약하다 그래서 salt를 사용하는데 salt는 패스워드마다 생성되는 랜덤값이다. 예를 들어 같은 1234라도 salt가 결합되면 다양한 해시값이 생성된다. 10은 default값이고 이 숫자가 높아지면 높아질수록 (시간을 길게 줄수록) 더 복잡한 해시값을 얻는다.(즉 해시값을 좀 더 복잡하게 암호화 할 수 있음.)

    const { username, password, nickname, email, phoneValue } = body;
    try {
        const hash = await bcrypt.hash(password, saltRounds);
        const usernameAlreadyExists = await usernameDoesExist(username);
        if (!usernameAlreadyExists) {
            const result = await storeUserInfo(username, hash, nickname, email, phoneValue);
            res.json({
                result: result,
                status: 200
            });
        } else {
            res.json({
                msg: "username is overlapped",
                status: 405
            }); //스트링으로 전송하기 때문에 프론트단에서 fetch후에 response.json() 이 아니라 respose.text()를 해주거나 res.json("username is overlapped") 로 표기해줘야한다!!
        }
    } catch (error) {
        next(new Error(error.message));
    }
};

const usernameDoesExist = async (username) => {
    const QUERY = 'SELECT username FROM leaguelogin where username = ?';
    const [rows] = await promisePool.query(QUERY, username);
    console.log('로우즈: ' + rows[0]);
    return rows.length > 0
}

app.use((err, req, res, next) => {
    //위에 함수에 매칭 안되거나 next()로 걸러진게 여기로 다옴
    if (err) {
        // 여기서 err 잡지 않고 에러만 핸들링하는 메들웨어로 보내주는 이유는 플젝이 커지고 코드가 많아질 경우 유지보수를위해!
        // res.status(500).send(err.message)
        next();
    } else {
        res.status(404).send('route not found');
    }
});

app.use((err, req, res, next) => {
    // 여긴 에러만 핸들링
    res.status(500).send(err.message);
})

const storeUserInfo = async (username, password, nickname, email, phoneValue) => {
    const QUERY = 'INSERT INTO leaguelogin(username, password,nickname,email, date, phone) VALUES (?,?,?,?,current_timestamp(),?)';
    const [rows] = await promisePool.query(QUERY, [username, password, nickname, email, phoneValue]);
    return rows;
}


exports.getUsername = async (req, res) => {
    console.log('username 찾으러 들어옴');
    console.log(req.body.phoneValue);
    const { email, phoneValue } = req.body;
    const data = await getUsernameFromDB(email, phoneValue);
    console.log(data === undefined);
    if (data === undefined) { // In case of there is no data
        res.json({
            result: 'Can not find data with your information',
            state: 411,
        })
    } else { // In case of there is data
        res.json({
            result: data,
            state: 200,
        });
    }
}

// select username from leaguelogin where email = 'magicq6265@gmail.com' and phone = +15874349974; 

const getUsernameFromDB = async (email, phoneValue) => {
    const QUERY = `select username, date from leaguelogin where email = ? and phone = ?`;
    const [rows] = await promisePool.query(QUERY, [email, phoneValue]);
    console.log(rows[0]);
    return rows[0]
}


exports.getChangePassword = async (req, res) => {

    if (req.body.type === 'emailType') {
        console.log('이메일로 번호 전송하러 들어옴');
        // 이메일로 번호를 전송한다.
        emailVerify.emailVerification(req, res);
    }
    if (req.body.type === 'changePWType') {
        console.log('패스워드 체인지하러 들어옴' + req.body.inputNewPW);
        console.log('패스워드 체인지하러 들어옴' + req.body.email);
        console.log('패스워드 체인지하러 들어옴' + req.body.phoneValue);

        const body = req.body;
        console.log(body);
        const saltRounds = 10; //hash 의 알고리즘이 공개되어있기때문에 취약하다 그래서 salt를 사용하는데 salt는 패스워드마다 생성되는 랜덤값이다. 예를 들어 같은 1234라도 salt가 결합되면 다양한 해시값이 생성된다. 10은 default값이고 이 숫자가 높아지면 높아질수록 (시간을 길게 줄수록) 더 복잡한 해시값을 얻는다.(즉 해시값을 좀 더 복잡하게 암호화 할 수 있음.)

        const { inputNewPW, email, phoneValue } = body;
        try {
            const hash = await bcrypt.hash(inputNewPW, saltRounds);
            const data = await modifyPassword(hash, email, phoneValue);
            res.json({
                result: data,
                state: 200,
            })
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
}

const modifyPassword = async (inputNewPW, email, phoneValue) => {
    const QUERY = `UPDATE leaguelogin SET PASSWORD = ? WHERE email = ? and phone = ?`;
    const [rows] = await promisePool.query(QUERY, [inputNewPW, email, phoneValue]);
    return rows[0];
}