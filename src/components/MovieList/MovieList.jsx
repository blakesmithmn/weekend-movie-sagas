import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './MovieList.css'
import { Paper, Card, CardContent, Typography, Button, CardActions, Box, Grid } from '@mui/material';


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
            <section className="movies">
                <Grid container spacing={4} className='movies' vh={100}>
                    {movies.map(movie => {
                        return (
                            <Grid item key={movie.id} onClick={(e) => { showDetails(movie) }} xs={4}>
                                <Card>
                                    <CardContent>
                                        <Typography variant='h3'>{movie.title}</Typography>
                                    </CardContent>
                                    <CardContent>
                                        <img src={movie.poster} alt={movie.title} />
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}

                </Grid>
            </section>
        </main >

    );
}

export default MovieList;