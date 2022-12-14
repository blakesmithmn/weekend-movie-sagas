import { Paper, Card, CardContent, Typography, Button, CardActions, Box, Grid, CardMedia, FormGroup, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';



export default function MovieSearchItem({ movie }) {
    const dispatch = useDispatch();
    const history = useHistory();
    // MOVIE VARIABLES 
    const movietitle = movie.title;
    const movieposter = `https://image.tmdb.org/t/p/original/${movie.poster_path}`
    const moviedescription = movie.overview;


    // FUNCTION TO TAKE GIVEN API DATA AND SEND IT SERVERSIDE
    // THEIR GENRE STUFF DOESN'T LINE UP WITH OURS SO IT JUST GETS AN UNSPECIFIED GENRE
    // THIS SAVES FROM USER ERRORS IN ADDING THEIR OWN MOVIES THOUGH!

    const addToMovieList = () => {
        console.log(movietitle);
        console.log(movieposter);
        console.log(moviedescription);
        dispatch({
            type: 'SAGA_ADD_TO_MOVIES',
            payload: {
                title: movietitle,
                poster: movieposter,
                description: moviedescription,
            }
        })
        swal({
            title: "Success!",
            text: "Movie Added to List",
            icon: "success",
        });
        history.push('/');
    }


    return (
        <Grid item xs={12} sm={12} md={6} lg={4} key={movie.id}>
            <Card className='MovieSearchItem'>
                <CardContent>
                    <Typography variant='h5'>
                        {movie.title}
                    </Typography>
                </CardContent>
                <CardMedia
                    component="img"
                    image={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    alt={movie.title}
                    onClick={(e) => { showDetails(movie) }}
                    sx={{ width: .50 }}
                />
                <CardContent>
                    <Typography variant='body2'>
                        {movie.overview}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button variant='contained' onClick={addToMovieList}>Add Favorite</Button>
                </CardActions>






            </Card>
        </Grid>
    )
}