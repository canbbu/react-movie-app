const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const ctrl = require('./server.ctrl');
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 이미지 파일 제공
app.use('/image', express.static('upload'));

// 라우터를 app에 연결
app.use('/', router);


// 라우터 설정
router.get('/userMovies/:type/:userId', ctrl.output.wishedData);
router.get('/detail/:userId/:movieId', ctrl.output.listDataGet);
router.post('/userMovies/:movieId', ctrl.process.listdataUpdate);
router.post('/login', ctrl.process.login);
// router.delete('/:id', ctrl.process.delete);

// 서버 시작
app.listen(port, () => console.log(`Listening on port ${port}`));