var express = require('express');
var app = express();

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/public'))

// axios を require してインスタンスを生成する
const axiosBase = require('axios');
const axios = axiosBase.create({
  baseURL: 'https://radiant-plains-63992.herokuapp.com/api/v1', // バックエンドB のURL:port を指定する
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  responseType: 'json'  
});

// [1] フロントエンドからのリクエストを受け付けて
app.get('/post', (req, res, next) => {
  // [2] バックエンドB に対してリクエストを投げる
  axios.get('/posts')
  .then((response) => {
    // [4] フロントエンドに対してレスポンスを返す
    res.render('index', {data: response.data})
    console.log(response.data)
  })
  .catch((error) => {
    console.log('ERROR!! occurred in Backend.')
  });
});

app.get('/index', (req, res, next) => {
  res.sendFile(__dirname + '/public/index.html')
});

app.listen(3000);
console.log('server is running')