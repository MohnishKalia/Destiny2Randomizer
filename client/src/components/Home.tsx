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
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import LocalDining from '@material-ui/icons/LocalDining';
import Whatshot from '@material-ui/icons/Whatshot';
import Security from '@material-ui/icons/Security';
import Delete from '@material-ui/icons/Delete';
// import { ReactComponent as HunterEmblem } from '../emblems/hunter_emblem.svg';
// import { ReactComponent as WarlockEmblem } from '../emblems/warlock_emblem.svg';
// import { ReactComponent as TitanEmblem } from '../emblems/titan_emblem.svg';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';

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
        },
        card: {
            minWidth: 300
        },
        players: {
            display: 'flex',
            flexDirection: 'column',
            gap: theme.spacing(3)
        },
        mla: {
            marginLeft: 'auto',
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

            <Typography variant="h2" align="center" className={styles.mb2}>Add Players</Typography>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={state.teams}
                        onChange={(_, checked) => dispatch?.({ type: 'edit_teams', selected: checked })}
                        color="primary"
                    />
                }
                label="Separate Into Teams"
            />
            <Paper className={clsx(styles.paper, styles.mb2, styles.players)}>
                {state.players.map((player, i) => (
                    <Card className={styles.card} variant="outlined" key={i}>
                        <CardActions>
                            <form noValidate autoComplete="off" onSubmit={(e) => { e.preventDefault() }}>
                                <TextField id="outlined-basic" label="Name" value={player.name} variant="standard" onChange={(e) => 
                                    dispatch?.({ type: 'edit_player', index: i, name: e.target.value, selectedClass: player.selectedClass })} />
                            </form>
                            <ToggleButtonGroup
                                value={player.selectedClass}
                                exclusive
                                onChange={(_, selClass) => selClass && 
                                    dispatch?.({ type: 'edit_player', index: i, name: player.name, selectedClass: selClass })}
                                aria-label="class select"
                            >
                                <ToggleButton value="hunter" aria-label="hunter">
                                    <LocalDining />
                                </ToggleButton>
                                <ToggleButton value="warlock" aria-label="warlock">
                                    <Whatshot />
                                </ToggleButton>
                                <ToggleButton value="titan" aria-label="titan">
                                    <Security />
                                </ToggleButton>
                            </ToggleButtonGroup>
                            <Fab size="small" color="secondary" className={styles.mla} aria-label="delete" onClick={() => dispatch?.({ type: 'remove_player', index: i })}>
                                <Delete />
                            </Fab>
                        </CardActions>
                    </Card>
                ))}
                <Button variant="contained" color="primary" onClick={() => dispatch?.({ type: 'add_player' })}>
                    Add Player
                </Button>
            </Paper>

            <Link to="/match" style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="primary">
                    Randomize!
                </Button>
            </Link>
        </>
    );
}
