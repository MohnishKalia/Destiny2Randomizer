import React, { useMemo } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Header from './components/Header';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import Match from './components/Match';
import Home from './components/Home';
import { StateProvider } from './store';

function App() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = useMemo(
        () =>
            createMuiTheme({
                palette: {
                    type: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    );

    return (
        <ThemeProvider theme={theme}>
            <StateProvider>
                <CssBaseline />
                <Header />
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        <Grid container item alignItems="center">
                            <Grid item md={2}></Grid>
                            <Grid item xs={12} md={8}>
                                <Router>
                                    <Switch>
                                        <Route path="/match">
                                            <Match />
                                        </Route>
                                        <Route path="/">
                                            <Home />
                                        </Route>
                                    </Switch>
                                </Router>
                            </Grid>
                            <Grid item md={2}></Grid>
                        </Grid>
                    </Grid>
                </Container>
            </StateProvider>
        </ThemeProvider>
    );
}

export default App;
