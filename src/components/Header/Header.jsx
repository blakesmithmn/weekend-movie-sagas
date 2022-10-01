import './Header.css';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

//MUI IMPORTS
import { AppBar, Box, Toolbar, Typography, Button, IconButton, Grid, Container, MenuItem, Menu, ButtonGroup } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function Header() {
    const history = useHistory();
    const navigationSwitch = () => {
        history.push('/')
    };

    return (
        <header className='App-header'>
            <Container maxWidth='xl'>
                <AppBar position='fixed' color='secondary' className='headerComponent'>
                    <Grid container>
                        <Grid item xs={1} textAlign='left'>
                            <Button variant='filled' onClick={navigationSwitch}>
                                Back
                            </Button>
                        </Grid>
                        <Grid item xs={11} textAlign='center'>
                            <Typography variant='h4'>
                                The Movies Saga
                            </Typography>
                        </Grid>

                    </Grid>
                </AppBar>
            </Container>
        </header>
    )
}
