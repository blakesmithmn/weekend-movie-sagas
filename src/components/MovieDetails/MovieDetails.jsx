import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

// MUI IMPORTS
import { Paper, Card, CardContent, Typography, Button, CardActions, Box, Grid } from '@mui/material';


export default
    function MovieDetails() {
    const dispatch = useDispatch();
    const history = useHistory();

    const moviedetails = useSelector(store => store.moviedetails);
    const genresArray = useSelector(store => store.genres);

    const params = useParams();

    useEffect(() => {
        const movieID = params.id;

        dispatch({
            type: 'FETCH_MOVIE_DETAILS',
            payload: movieID
        });
        return () => {
            dispatch({
                type: 'CLEAR_MOVIE_DETAILS'
            })
        }
    }, [params.id]);

    const handleBack = () => {
        history.push('/');
    }

    return (
        <>

            <Grid container spacing={12} className='detailsContainer' vh={100} xs={12} justifySelf='center'>
                <Grid item container xs={7}>
                    <Grid item xs={12}>
                        <Card a>
                            <CardActions>
                                <Button onClick={handleBack} variant='outlined'>BACK</Button>
                            </CardActions>
                            <CardContent>
                                <Typography variant='h4'>
                                    {moviedetails.title}
                                </Typography>
                                <img src={moviedetails.poster} alt={moviedetails.title} />

                            </CardContent>
                            <CardContent>
                                {genresArray.map(genre => (
                                    <Typography key={genre}>
                                        {genre}
                                    </Typography>
                                ))}
                            </CardContent>


                        </Card>

                    </Grid>
                </Grid>
                <Grid item container xs={5} direction='column'>
                    <Grid item>
                        <Card>
                            <CardContent>

                                <Typography variant='body2'>{moviedetails.description}</Typography>

                            </CardContent>
                        </Card>
                    </Grid>

                </Grid>
            </Grid>

        </>
    )
}