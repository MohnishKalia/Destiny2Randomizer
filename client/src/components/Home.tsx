import React from 'react'
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import { useStateContext } from '../store';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(1),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        mb2: {
            marginBottom: theme.spacing(2)
        }
    }),
);

export default function Home() {
    const styles = useStyles();
    const { state, dispatch } = useStateContext();
    return (
        <>
            <Typography variant="h2" align="center" className={styles.mb2}>Select Maps</Typography>
            <Grid container spacing={3} className={styles.mb2}>
                {state.maps.map(({ name, selected }) => (
                    <Grid item xs={6} md={4} key={name}>
                        <Paper className={styles.paper}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selected}
                                        onChange={(_, checked) => dispatch?.({ type: 'edit_map', name, selected: checked })}
                                        color="primary"
                                    />
                                }
                                label={name}
                            />
                        </Paper>
                    </Grid>
                ))}
            </Grid>
            <Link to="/match" style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="primary">
                    Randomize!
                </Button>
            </Link>
        </>
    );
}
