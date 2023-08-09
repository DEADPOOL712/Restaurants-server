const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;
const axios = require('axios');
const cors = require('cors');
// configs
// API_KEY = '2c569aae15f54917a0c8ecfd02bec6db';
API_KEY = '6f75e303644c4cd486bf940475f6c441';
// API_KEY = '131f49c708294ce8bc1db138e1087034';
// API_KEY = '308dbf0f4d12422886b741e9e3060762';

//CORS config
const allowedOrigins = [
  'https://react-restaurant-inky.vercel.app/random',
  'https://react-restaurant-inky.vercel.app/recipe',
  'https://react-restaurant-inky.vercel.app/search',
  'http://localhost:3000/',
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

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
