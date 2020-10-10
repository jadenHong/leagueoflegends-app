const express = require('express');
const router = express.Router();


const app = express();

app.use(express.json());
const emailVerifyController = require('./controllers/emailVerification.controllers');


router.post('/verification', emailVerifyController.emailVerification);
module.exports = router;
