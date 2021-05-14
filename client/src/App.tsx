import React, { useMemo } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Header from './components/Header';

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
            <CssBaseline />
            <Header />
            <Container maxWidth="lg">
				<Grid container spacing={3}>
					<Grid container item alignItems="center">
						<Grid item md={3}></Grid>
						<Grid item xs={12} md={6}>
                            <Typography variant="h2">Testing</Typography>
						</Grid>
						<Grid item md={3}></Grid>
					</Grid>
				</Grid>
			</Container>
        </ThemeProvider>
    );
}

export default App;
