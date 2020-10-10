const express = require('express');
const router = express.Router();


const app = express();

app.use(express.json());
const boardController = require('./controllers/board.controllers');


router.get('/getposteddata', boardController.getPostedData);

router.post('/post', boardController.postData);
module.exports = router;
