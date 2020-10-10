// npm i dotenv 명령어로 dotenv 설치. 환경변수를 위한 .env 파일을 따로 만들어서 호출하게 해주는 API이다. 모든 중요한 정보 (비밀번호, 키 등등)들은 환경변수에 저장을하고 그것을 불러와야하며 환경변수 파일 .env 는 gitignore에 추가를 해서 commit을 방지해야한다 무조건!!!
require('dotenv').config();
const http = require('http');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const champsData = require('./data-json/lol-champs.json');
const spellsData = require('./data-json/spells.json');
const runesData = require('./data-json/runes.json');
// 서버에서 바로 데이터를 받을 수 없어서 proxy-middleware 사용함
const { createProxyMiddleware } = require('http-proxy-middleware');

// sequelize mysql 접속, 접속완료
// const { sequelize } = require('../models');
// sequelize.sync();


const app = express();
app.use(cors());

// ***************************************     chat *********************************//
const multer = require('multer');
const socketio = require('socket.io');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

// 왜 꼭 이렇게 해줘야하지?
const server = http.createServer(app);
const io = socketio(server);
// Chat 컴포넌트에서 23번 줄에 socket = io(localhost:5000)으로 서버에 요청을 함으로써 이쪽으로 connect 하게 된다.
io.on('connect', (socket) => {
    console.log('We have a new connection!!!');
    // console.log('socket id : ' + socket.id); // 고유한 id가 자동으로 생성이된다.

    // on : emit 으로 보낸 요청을 on 으로 응답한다.
    socket.on('join', ({ name, room, icon }, callback) => {// 클라이언트측 component인 Chat에서 emit('join') 을 사용했으므로 'join'이라는 이벤트를 여기서 받는다.
        const { error, user } = addUser({ id: socket.id, name, room, icon });

        if (error) {
            console.log('error 발생함')
            return callback(error);
        }

        socket.join(user.room);

        // 사용자가 채팅창에 들어오면 화면에 자동으로 출력된다.
        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`, userIcon: 'chat2.png' });
        // 어떠한 사용자가 들어오면 자신을 제외한 나머지 사람에게 메세지를 서버를 거치지 않고 바로 띄워줄때 broadcast 를 사용한다.
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!`, userIcon: 'chat2.png' });

        // 어떠한 특정한 room이나 사람에게 메세지를 전달할때 io.to 를 사용한다.
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

        callback();// 이렇게 콜백을 지정함으로써 함수가 실행되고 프론트에서 다시 새로운 요청이나 일을 할수가 있다.
    });

    socket.on('sendMessage', (message, callback) => {
        console.log('userIcon: ' + message.userIcon);
        const user = getUser(socket.id); // 메세지를 보낸 유저의 id를 socket을 통해서 가져올수 있다.
        console.log('img: ' + message.url);
        console.log('Icon 뽑기: ' + message);
        io.to(user.room).emit('message', { user: user.name, time: message.time, text: message.msg, url: message.url, fileName: message.fileName, userIcon: message.userIcon });

        callback();
    });

    socket.on('disconnect', () => {
        // console.log('User had left!!!');
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        }
    })
});


// 사진 비디오 파일 요청 받고 저장
const storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    // fileFilter: (req, file, cb) => {
    //     const ext = path.extname(file.originalname)
    //     if(ext !== '.jpg' && ext !== '.png' && ext !== '.mp4'){
    //         return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
    //     }
    //     cb(null, ture);
    // }

})


// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 10000000 }
// });

// app.post("/upload", upload.single("file"), function (req, res, next) {
//     console.log(req.file);
//     res.send({
//         success: true, url: res.req.file.path, fileName: req.file.filename
//     });
// });


const upload = multer({ storage: storage }).single("file");

app.post("/upload", (req, res) => {
    console.log('파일 업로드 하는곳으로 들어옴');
    console.log(req.file);
    upload(req, res, err => {
        if (err) { return res.json({ success: false, err }) }
        console.log('path: ' + req.file.path);
        return res.json({ success: true, url: res.req.file.path, fileName: req.file.filename });
    });
})

// 이렇게 미들웨어로 public 폴더를 정적으로 만들어줘야 외부에서 로컬호스트의 이 public 폴더로 접속을 할 수가 있다.
app.use(express.static("public"));

const challenger = require('./routes/getChallenger');
const grandmaster = require('./routes/getGrandmaster');
const master = require('./routes/getMaster');
const diamond = require('./routes/getDiamond');
const platinum = require('./routes/getPlatinum');
const gold = require('./routes/getGold');
const silver = require('./routes/getSilver');
const bronze = require('./routes/getBronze');
const iron = require('./routes/getIron');

// sign in sign up
const customers = require('./routes/getCustomers');
const boardInfo = require('./routes/getBoard');
const emailVerify = require('./routes/getEmailVerification');


app.use(express.json());
app.use('/CHALLENGER', challenger);
app.use('/GRANDMASTER', grandmaster);
app.use('/MASTER', master);
app.use('/DIAMOND', diamond);

// signup, signin 을 위한 middleware
app.use('/user', customers);
// board에서 정보 저장, 출력을 위한 middleware
app.use('/board', boardInfo);
// email 확인을 위해 전송
app.use('/email', emailVerify);


// app.post('/login', (req, res) => {
//     const a = req.body;
//     console.log(a);
//     console.log('login들어옴')
// })



const {
    SERVER_PORT,
    RIOT_TOKEN
} = process.env;

const options = {
    target: 'https://kr.api.riotgames.com/',
    headers: {
        'X-Riot-Token': RIOT_TOKEN,
    },
    changeOrigin: true,
    router: req => {
        const { region } = req.query;
        return region ? `https://${region}.api.riotgames.com` : `https://kr.api.riotgames.com`;
    }
}
const lolProxy = createProxyMiddleware(options);

// 이부분이 호출이 되면 요청을 여기서 받고 응답을 해주고 '땡' 한다. 즉 끝. 그 다음건 읽지 않음.
// 챔피언 정보 json 파일에서 받아온다.
app.get('/champs', (req, res) => {
    const champs = champsData.data;
    console.log('champs 정보 받으러 들어옴');
    res.json(champs);
})

// 스펠 정보 json 파일에서 받아온다.
app.get('/spells', (req, res) => {
    const spells = spellsData.data;
    console.log('spells 정보 받으러 들어옴');
    res.json(spells);
})

// 룬 정보 json 파일에서 받아온다.
app.get('/runes', (req, res) => {
    console.log('rune 정보 받으러 들어옴');
    const runes = runesData;
    // console.log(runes);
    res.json(runes);
})

app.use('/', lolProxy, (req, res) => {
    console.log(req.headers)
    console.log('hi');
    console.log(req.params.id);
});

// 이렇게 app.listen 으로 하면 채팅이 되지 않음...???

// app.listen(SERVER_PORT, () => {
//     console.log(`Server is listening to ${SERVER_PORT}`);
//     console.log(`RIOT_TOKEN=${RIOT_TOKEN}`)
// });

server.listen(SERVER_PORT || 7779, () => {
    console.log(`Server has started with ${SERVER_PORT}`)
    console.log(`RIOT_TOKEN=${RIOT_TOKEN}`)
});



































// // npm i dotenv 명령어로 dotenv 설치. 환경변수를 위한 .env 파일을 따로 만들어서 호출하게 해주는 API이다. 모든 중요한 정보 (비밀번호, 키 등등)들은 환경변수에 저장을하고 그것을 불러와야하며 환경변수 파일 .env 는 gitignore에 추가를 해서 commit을 방지해야한다 무조건!!!
// require('dotenv').config();
// const http = require('http');
// const express = require('express');
// const cookieParser = require('cookie-parser');
// const cors = require('cors');
// const champsData = require('./data-json/lol-champs.json');
// const spellsData = require('./data-json/spells.json');
// const runesData = require('./data-json/runes.json');
// // 서버에서 바로 데이터를 받을 수 없어서 proxy-middleware 사용함
// const { createProxyMiddleware } = require('http-proxy-middleware');

// // sequelize mysql 접속, 접속완료
// // const { sequelize } = require('../models');
// // sequelize.sync();


// const app = express();
// app.use(cors());

// // ***************************************     chat *********************************//
// const multer = require('multer');
// const socketio = require('socket.io');
// const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
// const server = http.createServer(app);
// const io = socketio(server);
// // Chat 컴포넌트에서 23번 줄에 socket = io(localhost:5000)으로 서버에 요청을 함으로써 이쪽으로 connect 하게 된다.
// io.on('connect', (socket) => {
//     console.log('We have a new connection!!!');
//     // console.log('socket id : ' + socket.id); // 고유한 id가 자동으로 생성이된다.

//     // on : emit 으로 보낸 요청을 on 으로 응답한다.
//     socket.on('join', ({ name, room, icon }, callback) => {// 클라이언트측 component인 Chat에서 emit('join') 을 사용했으므로 'join'이라는 이벤트를 여기서 받는다.
//         const { error, user } = addUser({ id: socket.id, name, room, icon });

//         if (error) {
//             console.log('error 발생함')
//             return callback(error);
//         }

//         socket.join(user.room);

//         // 사용자가 채팅창에 들어오면 화면에 자동으로 출력된다.
//         socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`, userIcon: 'chat2.png' });
//         // 어떠한 사용자가 들어오면 자신을 제외한 나머지 사람에게 메세지를 서버를 거치지 않고 바로 띄워줄때 broadcast 를 사용한다.
//         socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!`, userIcon: 'chat2.png' });

//         // 어떠한 특정한 room이나 사람에게 메세지를 전달할때 io.to 를 사용한다.
//         io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

//         callback();// 이렇게 콜백을 지정함으로써 함수가 실행되고 프론트에서 다시 새로운 요청이나 일을 할수가 있다.
//     });

//     socket.on('sendMessage', (message, callback) => {
//         console.log('userIcon: ' + message.userIcon);
//         const user = getUser(socket.id); // 메세지를 보낸 유저의 id를 socket을 통해서 가져올수 있다.
//         console.log('img: ' + message.url);
//         console.log('Icon 뽑기: ' + message);
//         io.to(user.room).emit('message', { user: user.name, time: message.time, text: message.msg, url: message.url, fileName: message.fileName, userIcon: message.userIcon });

//         callback();
//     });

//     socket.on('disconnect', () => {
//         // console.log('User had left!!!');
//         const user = removeUser(socket.id);

//         if (user) {
//             io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
//             io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
//         }
//     })
// });


// // 사진 비디오 파일 요청 받고 저장
// const storage = multer.diskStorage({
//     destination: "./public/uploads/",
//     filename: function (req, file, cb) {
//         cb(null, `${Date.now()}_${file.originalname}`);
//     },
//     // fileFilter: (req, file, cb) => {
//     //     const ext = path.extname(file.originalname)
//     //     if(ext !== '.jpg' && ext !== '.png' && ext !== '.mp4'){
//     //         return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
//     //     }
//     //     cb(null, ture);
//     // }

// })


// // const upload = multer({
// //     storage: storage,
// //     limits: { fileSize: 10000000 }
// // });

// // app.post("/upload", upload.single("file"), function (req, res, next) {
// //     console.log(req.file);
// //     res.send({
// //         success: true, url: res.req.file.path, fileName: req.file.filename
// //     });
// // });


// const upload = multer({ storage: storage }).single("file");

// app.post("/upload", (req, res) => {
//     console.log('파일 업로드 하는곳으로 들어옴');
//     console.log(req.file);
//     upload(req, res, err => {
//         if (err) { return res.json({ success: false, err }) }
//         console.log('path: ' + req.file.path);
//         return res.json({ success: true, url: res.req.file.path, fileName: req.file.filename });
//     });
// })

// // 이렇게 미들웨어로 public 폴더를 정적으로 만들어줘야 외부에서 로컬호스트의 이 public 폴더로 접속을 할 수가 있다.
// app.use(express.static("public"));

// const challenger = require('./routes/getChallenger');
// const grandmaster = require('./routes/getGrandmaster');
// const master = require('./routes/getMaster');
// const diamond = require('./routes/getDiamond');
// const platinum = require('./routes/getPlatinum');
// const gold = require('./routes/getGold');
// const silver = require('./routes/getSilver');
// const bronze = require('./routes/getBronze');
// const iron = require('./routes/getIron');

// // sign in sign up
// const customers = require('./routes/getCustomers');


// app.use(express.json());
// app.use('/CHALLENGER', challenger);
// app.use('/GRANDMASTER', grandmaster);
// app.use('/MASTER', master);
// app.use('/DIAMOND', diamond);

// // signup, signin 을 위한 middleware
// app.use('/user', customers);




// // app.post('/login', (req, res) => {
// //     const a = req.body;
// //     console.log(a);
// //     console.log('login들어옴')
// // })



// const {
//     SERVER_PORT,
//     RIOT_TOKEN
// } = process.env;

// const options = {
//     target: 'https://kr.api.riotgames.com/',
//     headers: {
//         'X-Riot-Token': RIOT_TOKEN,
//     },
//     changeOrigin: true,
//     router: req => {
//         const { region } = req.query;
//         return region ? `https://${region}.api.riotgames.com` : `https://kr.api.riotgames.com`;
//     }
// }
// const lolProxy = createProxyMiddleware(options);

// // 이부분이 호출이 되면 요청을 여기서 받고 응답을 해주고 '땡' 한다. 즉 끝. 그 다음건 읽지 않음.
// // 챔피언 정보 json 파일에서 받아온다.
// app.get('/champs', (req, res) => {
//     const champs = champsData.data;
//     console.log('champs 정보 받으러 들어옴');
//     res.json(champs);
// })

// // 스펠 정보 json 파일에서 받아온다.
// app.get('/spells', (req, res) => {
//     const spells = spellsData.data;
//     console.log('spells 정보 받으러 들어옴');
//     res.json(spells);
// })

// // 룬 정보 json 파일에서 받아온다.
// app.get('/runes', (req, res) => {
//     console.log('rune 정보 받으러 들어옴');
//     const runes = runesData;
//     // console.log(runes);
//     res.json(runes);
// })

// app.use('/', lolProxy, (req, res) => {
//     console.log(req.headers)
//     console.log('hi');
//     console.log(req.params.id);
// });


// // app.listen(SERVER_PORT, () => {
// //     console.log(`Server is listening to ${SERVER_PORT}`);
// //     console.log(`RIOT_TOKEN=${RIOT_TOKEN}`)
// // });

// server.listen(SERVER_PORT || 7779, () => console.log(`Server has started with ${SERVER_PORT}`));





