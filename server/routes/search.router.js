const express = require('express');
const router = express.Router();
const axios = require('axios');

const API_KEY = process.env.API_KEY;

// Get GIFS based on search Q
router.get('/:query', (req, res) => {
    // console.log('received search get request')
    // Get the q parameter
    let search = req.params.query;
    console.log('SEARCH IS:', req.params.query);

    // AXIOS REQUEST TO MOVIE DB API
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${search}&page=1&include_adult=false`)
        .then((searchRes => {
            console.log('SEARCH RESULT IS:', searchRes);
            res.send(searchRes.data.results)
        }))
        .catch((error => {
            console.log('/search GET Error', error);
        }));
})



module.exports = router;