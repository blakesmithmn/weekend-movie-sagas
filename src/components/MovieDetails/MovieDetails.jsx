import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router-dom';

export default
    function MovieDetails() {
    const dispatch = useDispatch();
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


    return (
        <Grid container spacing={2} className='detailsContainer' vh={100}>
            <Grid item xs={8}>
                <img src={moviedetails.poster} alt={moviedetails.title} />
            </Grid>
            <Grid item xs={4}>
                {moviedetails.title}
            </Grid>
        </Grid>
    )
}