const express = require('express');
const nodemailer = require('nodemailer');
const smtpPool = require('nodemailer-smtp-pool');
// const { MatchedGameDetail } = require('../../../client/src/components');




exports.emailVerification = async (req, res) => {

    const { email } = req.body;
    console.log(email);

    let number = "";
    let random = 0;

    const numsOfVerification = () => {
        for (let i = 0; i < 6; i++) {
            random = Math.trunc(Math.random() * (9 - 0) + 0);
            number += random;
        }
        return number;

    }
    numsOfVerification();
    res.json(number);


    // email 확인 하기 위해서 넘버 발송.

    // const smtpTransport = nodemailer.createTransport(smtpPool({
    //     service: 'Gmail',
    //     host: 'localhost',
    //     port: '587',
    //     tls: {
    //         rejectUnauthorize: false
    //     },

    //     //이메일 전송을 위해 필요한 인증정보

    //     //gmail 계정과 암호 
    //     auth: {
    //         user: process.env.TEST_EMAIL_ACC,
    //         pass: process.env.EMAIL_PASSWORD
    //     },
    //     maxConnections: 5,
    //     maxMessages: 10
    // }));

    // const mailOpt = {
    //     from: process.env.TEST_EMAIL_ACC,
    //     to: email,
    //     subject: 'Nodemailer 테스트',
    //     text: `인증 칸에 아래의 숫자를 입력해주세요.\n ${numsOfVerification()}`
    // }
    // smtpTransport.sendMail(mailOpt, function (err, res) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log('Message send :' + res);
    //     }

    //     smtpTransport.close();
    // })



}

