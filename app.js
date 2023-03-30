const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 8080;
const axios = require('axios');
const cors = require('cors');
// configs
API_KEY = '2c569aae15f54917a0c8ecfd02bec6db';

// APP USE
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// RESPONSE RANDOME TOP PICKS
app.post('/random', (req, res) => {
  //vegetarian
  const target = req.body.target || '';
  const fetchRandom = async () => {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}&tags=${target}`
    );

    const randomResult = await response.data.recipes;
    console.log(randomResult);
    res.json(randomResult);
  };
  fetchRandom();
});

// RESPONSE BASED ON SEARCH
app.post('/search', (req, res) => {
  const target = req.body.target;
  const fetchSearch = async () => {
    // console.log('req recived');
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?query=${target}&apiKey=${API_KEY}`
    );
    // console.log(response);
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
      `https://api.spoonacular.com/recipes/complexSearch?cuisine=${cuisine}&apiKey=6f75e303644c4cd486bf940475f6c441`
    );
    const cuisineResult = await response.data;
    res.json(cuisineResult);
  };
  fetchCuisine();
});

app.listen(PORT, () => {
  console.log('Server is live ! ', PORT);
});
