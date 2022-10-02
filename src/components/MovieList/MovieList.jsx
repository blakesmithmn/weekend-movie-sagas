import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './MovieList.css'
import { Paper, Card, CardContent, Typography, Button, CardActions, Box, Grid, CardMedia } from '@mui/material';


function MovieList() {
    const history = useHistory();
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    const showDetails = (movie) => {
        console.log(movie.id);
        history.push(`/details/${movie.id}`)
    }

    return (
        <main>

            <Grid container spacing={4} className='movies' vh={100}>
                {movies.map(movie => {
                    return (
                        <Grid item key={movie.id} xs={12} sm={12} md={6} lg={4}>
                            <Card className='MovieListItem'>
                                <CardContent>
                                    <Typography variant='h5'>{movie.title}</Typography>
                                </CardContent>
                                <CardMedia
                                    component="img"
                                    image={movie.poster}
                                    alt={movie.title}
                                    onClick={(e) => { showDetails(movie) }}
                                    sx={{ width: .80 }}
                                />
                            </Card>
                        </Grid>
                    );
                })}

            </Grid>

        </main >

    );
}

export default MovieList;