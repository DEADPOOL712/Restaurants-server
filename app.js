const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;
const axios = require('axios');
const cors = require('cors');
API_KEY = '6f75e303644c4cd486bf940475f6c441';

app.use(function (req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  const allowedOrigins = [
    'http://localhost:3000',
    'https://react-restaurant-inky.vercel.app/random',
    'https://react-restaurant-inky.vercel.app/',
    'https://restaurant-server-fv28.onrender.comp/random',
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header('Access-Control-Allow-credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, UPDATE');
  next();
});

// app.use(cors());

// APP USE
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// RESPONSE RANDOME TOP PICKS
app.post('/random', (req, res) => {
  //vegetarian
  const target = req.body.target || '';
  const number = req.body.number || 10;
  const fetchRandom = async () => {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/random?number=${number}&apiKey=${API_KEY}&tags=${target}`
    );

    const randomResult = await response.data.recipes;
    res.json(randomResult);
  };
  fetchRandom();
});

// RESPONSE OF RECIPE INFORMATION
app.post('/recipe', (req, res) => {
  const id = req.body.id;
  const fetchInfo = async () => {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
    );
    const recipeResult = response;
    console.log(recipeResult.data);
    // console.log(recipeResult);
    res.json(recipeResult.data);
  };
  fetchInfo();
});

// RESPONSE BASED ON SEARCH
app.post('/search', (req, res) => {
  const target = req.body.target;
  const fetchSearch = async () => {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?query=${target}&apiKey=${API_KEY}`
    );
    const searchResult = await response.data;
    res.json(searchResult);
  };
  fetchSearch();
});

// RESPONSE BASED ON CUISINE
app.post('/cuisine/:name', (req, res) => {
  //American,Indian,Italian,Japanese,Thai,Chinese
  const cuisine = req.params.name;
  const fetchCuisine = async () => {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?cuisine=${cuisine}&apiKey=${API_KEY}`
    );
    const cuisineResult = await response.data;
    res.json(cuisineResult);
  };
  fetchCuisine();
});

app.listen(PORT, () => {
  console.log('Server is live ! ', PORT);
});
