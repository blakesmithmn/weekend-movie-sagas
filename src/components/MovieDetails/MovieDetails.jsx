import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

// MUI IMPORTS
import { Paper, Card, CardContent, Typography, Button, CardActions, Box } from '@mui/material';


export default
    function MovieDetails() {
    const dispatch = useDispatch();
    const history = useHistory();

    const moviedetails = useSelector(store => store.moviedetails);
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

            <Grid container spacing={10} className='detailsContainer' vh={100}>
                <Grid item xs={7}>
                    <Card>
                        <CardActions>
                            <Button onClick={handleBack} variant='outlined'>BACK</Button>
                        </CardActions>
                        <CardContent>
                            <Typography variant='h4'>
                                {moviedetails.title}
                            </Typography>
                            <img src={moviedetails.poster} alt={moviedetails.title} />

                        </CardContent>


                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card>
                        <CardContent>
                            <Typography variant='body2'>{moviedetails.description}</Typography>

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

        </>
    )
}