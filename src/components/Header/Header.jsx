import './Header.css';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

//MUI IMPORTS
import { AppBar, Box, Toolbar, Typography, Button, IconButton, Grid, Container, MenuItem, Menu, ButtonGroup } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function Header() {
    const history = useHistory();
    const navigationSwitch = (navigation) => {
        history.push(navigation);

    };

    return (
        <header className='App-header'>
            <Container maxWidth='md'>
                <AppBar position='fixed' color='secondary' className='headerComponent' >
                    <Grid container>
                        <Grid item xs={7} sm={6} textAlign='left'>
                            <Typography variant='h4'>
                                The Movies Saga
                            </Typography>
                        </Grid>
                        <Grid item xs={6} sm={6} textAlign='right'>
                            <ButtonGroup>
                                <Button variant='contained' color='secondary' onClick={(e) => navigationSwitch('/')}>
                                    Home
                                </Button>
                                <Button variant='contained' color='secondary' onClick={(e) => navigationSwitch('/search')}>
                                    Search
                                </Button>

                            </ButtonGroup>
                        </Grid>

                    </Grid>
                </AppBar>
            </Container>
        </header>
    )
}
