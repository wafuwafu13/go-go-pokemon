const express = require('express');
const app = express();

app.set('port', (process.env.PORT || 3000));
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/public'))

const axiosBase = require('axios');
const axios = axiosBase.create({
  baseURL: 'https://go-go-pokemon-api-server.herokuapp.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  responseType: 'json'
});

app.get('/', (res) => {
  res.sendfile(__dirname + '/public/index.html');
})

app.get('/pokemon', (req, res, next) => {
  axios.get('/pokemons')
  .then((response) => {
    res.render('index', {data: response.data.data})
    console.log(response.data)
  })
  .catch((error) => {
    console.log('ERROR!! occurred in Backend.' + error)
  });
});

app.get('/post/:name/:id', (req, res, next) => {
  axios.post('/pokemons', {
    name: req.params.name,
    poke_id: req.params.id
  })
  .then((response) => {
    console.log(response.data)
  })
  .catch((error) => {
    console.log('ERROR!! occurred in Backend.' + error)
  });
});

app.get('/delete/:id', (req, res, next) => {
  axios.delete('pokemons/' + req.params.id)
  .then((response) => {
    console.log(response.data)
  })
  .catch((error) => {
    console.log('ERROR!! occurred in Backend.' + error)
  });
})
app.listen(3000);
console.log('server is running')