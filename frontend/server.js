var express = require('express');
var router = express.Router();
var app = express();

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
app.get('/', function(req, res, next) {

  // [2] バックエンドB に対してリクエストを投げる
  axios.get('/posts')
  .then(function(response) {

    // [4] フロントエンドに対してレスポンスを返す
    console.log(response)
  })
  .catch(function(error) {
    console.log('ERROR!! occurred in Backend.')
  });
});

module.exports = router;
app.listen(3000);