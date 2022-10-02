import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import './MovieDetails.css'
import GenreDropdown from './GenreDropdown';


// MUI IMPORTS
import { Paper, Card, CardContent, Typography, Button, CardActions, Box, Grid, CardMedia, Divider } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

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

            <Grid container spacing={2} className='detailsContainer' vh={100} justifySelf='center'>
                <Grid item xs={12} sm={6} sx={{ boxShadow: 2 }}>
                    <Card className='MoviePhotoItem'>
                        <CardActions>
                            <Button onClick={handleBack} variant='contained' color='error' edge='start'>
                                <ArrowBackIosNewIcon />
                                BACK
                            </Button>
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
                <Grid item xs={12} sm={6} justifyContent='left'>
                    <Grid item>
                        <Card className='MovieDetailsCard'>
                            <CardContent>
                                <Typography variant='h4'>
                                    {moviedetails.title}
                                </Typography>
                            </CardContent>
                            <Divider variant='middle' />
                            <CardContent>

                                <Typography variant='body2'>{moviedetails.description}</Typography>

                            </CardContent>
                            <Divider variant='middle' />
                            <CardContent>
                                <Typography variant='h6'>Genre(s):</Typography>
                                {genresArray.map(genre => (

                                    <Typography key={genre}>
                                        {genre}
                                    </Typography>
                                ))}
                                <GenreDropdown />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>

        </>
    )
}