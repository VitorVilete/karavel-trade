import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import './App.css';

import React, { Component } from 'react';
import Quotas from './components/Quotas';

export default class App extends Component {
    state = {};

    render(): JSX.Element {
        return (
            <Box>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <Typography variant="h6" color="inherit">
                            Karavel
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Container maxWidth="lg">
                    <Box>
                        <Quotas />
                    </Box>
                </Container>
            </Box>
        );
    }
}
