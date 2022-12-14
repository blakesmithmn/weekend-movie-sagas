import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MovieSearchItem from './MovieSearchItem';
import './MovieSearch.css'

// MUI IMPORTS
import { Paper, Card, CardContent, Typography, Button, CardActions, Box, Grid, CardMedia, FormGroup, TextField, Container } from '@mui/material';


export default function MovieSearch() {
    //FORM TO HANDLE SEARCHING THE MOVIE DATABASE API
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();
    // SEND SEARCH STRING TO SAGA - HANDLE API SERVERSIDE
    const submitSearch = (event) => {
        event.preventDefault();
        dispatch({
            type: 'SAGA_SEARCH_MOVIES',
            payload: search
        })
        // CLEAR INPUT
        setSearch('');

    }

    const searchResults = useSelector(store => store.searchResults);
    // SHOULD RETURN AN ARRAY OF OBJECTS FOR US TO MAP
    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <form onSubmit={submitSearch} className='searchBar'>
                        <TextField
                            id='outlined-basic'
                            size='small'
                            label='Search'
                            variant='outlined'
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                        />

                        <Button id='button' type='submit' variant='contained'>Search</Button>
                    </form>
                </Grid>

                {/* API SEARCH RESULTS */}

                {searchResults.map(movie => {
                    return (
                        <MovieSearchItem movie={movie} key={movie.id} />
                    );
                })}


            </Grid>
        </>

    )
}