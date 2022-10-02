const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  // Add query to get all genres
  const sqlQuery = `SELECT * FROM genres ORDER BY name ASC`

  pool.query(sqlQuery)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('Error in getting genres from DB', error);
      res.sendStatus(500)
    })
});

router.put('/:id', (req, res) => {
  const updateID = req.params.id;
  const sqlQuery = `
      UPDATE "movies_genres"
        SET "genre_id" = $1
        WHERE "movie_id" = $2;
  `
})

module.exports = router;