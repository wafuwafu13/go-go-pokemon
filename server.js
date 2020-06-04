var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'))

const axiosBase = require('axios');
const axios = axiosBase.create({
  baseURL: 'https://agile-thicket-77925.herokuapp.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  responseType: 'json'  
});

app.get('/get', (req, res, next) => {
  axios.get('/pokemons')
  .then((response) => {
    console.log(response.data)
  })
  .catch((error) => {
    console.log('ERROR!! occurred in Backend.')
  });
});

app.get('/post/:name/:id([0-9]+)', (req, res, next) => {
  axios.post('/pokemons', {
    name: req.params.name,
    poke_id: req.params.id
  })
  .then((response) => {
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