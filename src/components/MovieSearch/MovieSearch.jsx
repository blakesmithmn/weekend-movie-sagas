import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MovieSearchItem from './MovieSearchItem';
import './MovieSearch.css'

// MUI IMPORTS
import { Paper, Card, CardContent, Typography, Button, CardActions, Box, Grid, CardMedia, FormGroup, TextField } from '@mui/material';


export default function MovieSearch() {
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();
    const submitSearch = () => {
        dispatch({
            type: 'SAGA_SEARCH_MOVIES',
            payload: search
        })
        // CLEAR INPUT
        // setSearch('');

    }

    const searchResults = useSelector(store => store.searchResults);
    // SHOULD RETURN AN ARRAY OF OBJECTS FOR US TO MAP
    return (
        <>
            <form onSubmit={submitSearch}>
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

            <Grid>
                <Grid container spacing={4} className='searchGrid' vh={100}>
                    {searchResults.map(movie => {
                        return (
                            <MovieSearchItem movie={movie} key={movie.id} />
                        );
                    })}

                </Grid>
            </Grid>
        </>

    )
}