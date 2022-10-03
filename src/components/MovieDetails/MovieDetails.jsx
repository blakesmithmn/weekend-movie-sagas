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
    // THIS IS THE DETAIL VIEW YOU GET PUSHED TO AFTER CLICKING ON A PHOTO

    const dispatch = useDispatch();
    const history = useHistory();

    // ARRAYS WE WILL MAP LATER FOR THE MOVIE DETAILS AND ITS GENRES
    // SQL JOIN GRABS THE GENRES!
    const moviedetails = useSelector(store => store.moviedetails);
    const genresArray = useSelector(store => store.genres);

    const params = useParams();

    // USE EFFECT CONDITIONS SO THAT THE URL's PERSIST AFTER RELOAD
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


    // FUNCTION TO HANDLE NAVIGATION BACK TO THE MAIN PAGE
    const handleBack = () => {
        history.push('/');
    }

    return (
        <>

            <Grid container spacing={2} className='detailsContainer' vh={100} justifySelf='center'>
                <Grid item xs={12} sm={6} >
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