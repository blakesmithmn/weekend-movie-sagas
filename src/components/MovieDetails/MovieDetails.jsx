import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import './MovieDetails.css'


// MUI IMPORTS
import { Paper, Card, CardContent, Typography, Button, CardActions, Box, Grid, CardMedia } from '@mui/material';


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

            <Grid container spacing={5} className='detailsContainer' vh={100} justifySelf='center'>
                <Grid item container xs={12} sm={6} lg={8} justifyContent='center'>
                    <Grid item xs={12} sm={6} lg={8} sx={{ boxShadow: 2 }}>
                        <Card className='MoviePhotoItem'>
                            <CardActions>
                                <Button onClick={handleBack} variant='outlined'>BACK</Button>
                            </CardActions>

                            <CardMedia
                                component="img"
                                sx={{ width: .75 }}
                                image={moviedetails.poster}
                                alt={moviedetails.title}
                                textAlign='center'
                            />
                        </Card>

                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                    <Grid item>
                        <Card className='MovieDetailsCard'>
                            <CardContent>
                                <Typography variant='h4'>
                                    {moviedetails.title}
                                </Typography>
                            </CardContent>
                            <CardContent>

                                <Typography variant='body2'>{moviedetails.description}</Typography>

                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item>
                        <Card className='MovieDetailsCard'>
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
            </Grid>

        </>
    )
}