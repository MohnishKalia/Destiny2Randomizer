import React, { useMemo } from 'react'
import { useStateContext } from '../store';
import { randomSelection } from '../utils';
import { maps } from '../data';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { classes } from '../data'
import { shuffle } from '../utils'
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            maxWidth: '100%',
            position: 'relative',
        },
        media: {
            filter: 'brightness(40%)',
        },
        overlay: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        },
        table: {
            minWidth: 650,
        },
    }),
);

export default function Match() {
    const styles = useStyles();
    const { state } = useStateContext();
    const selectedMap = useMemo(() => {
        const selectedMaps = state.maps.filter(map => map.selected).map(map => map.name);
        const [selectedMap] = randomSelection(selectedMaps, 1);
        return selectedMap;
    }, [state.maps]);

    const players = useMemo(() => {
        const validPlayers = state.players.filter(player => player.name.trim()).map(player => {
            const validSubclasses = Object.keys(classes[player.selectedClass]);
            const [randomSubclass] = randomSelection(validSubclasses, 1) as [keyof (typeof classes[(keyof typeof classes)])];
            const trees = ['Top', 'Middle', 'Bottom'];
            const [randomTree] = randomSelection(trees, 1);
            const info = classes[player.selectedClass][randomSubclass];
            return { ...player, imgUrl: info.icon, display: `${randomTree} Tree ${info.name}` }
        });
        if (state.teams) {
            shuffle(validPlayers);
            const alphaTeam = validPlayers.splice(0, Math.ceil(validPlayers.length / 2));
            return { teams: true, alphaTeam, bravoTeam: validPlayers };
        }
        return { teams: false, players: validPlayers };
    }, [state.players, state.teams]);

    return (
        <div>
            <Card className={styles.root}>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    image={maps[selectedMap]}
                    title="Contemplative Reptile"
                    className={styles.media}
                />
                <div className={styles.overlay}>
                    <Typography variant="button">The Random Map Is:</Typography>
                    <Typography variant="h3">{selectedMap}</Typography>
                </div>
            </Card>
            <Box m={2}>
                <Grid container spacing={3}>
                    {players.teams
                        ? (
                            <>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="h5">Alpha Team</Typography>
                                    <List>
                                        {players.alphaTeam!.map((player, i) => (
                                            <ListItem key={i}>
                                                <ListItemAvatar>
                                                    <Avatar src={player.imgUrl} />
                                                </ListItemAvatar>
                                                <ListItemText primary={player.name} secondary={player.display} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="h5">Beta Team</Typography>
                                    <List>
                                        {players.bravoTeam!.map((player, i) => (
                                            <ListItem key={i}>
                                                <ListItemAvatar>
                                                    <Avatar src={player.imgUrl} />
                                                </ListItemAvatar>
                                                <ListItemText primary={player.name} secondary={player.display} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Grid>
                            </>
                        )
                        : (
                            <Grid item xs={12}>
                                <Typography variant="h5">Players</Typography>
                                <List>
                                    {players.players!.map((player, i) => (
                                        <ListItem key={i}>
                                            <ListItemAvatar>
                                                <Avatar src={player.imgUrl} />
                                            </ListItemAvatar>
                                            <ListItemText primary={player.name} secondary={player.display} />
                                        </ListItem>
                                    ))}
                                </List>
                            </Grid>
                        )
                    }
                </Grid>
            </Box>
            <Link to="/" style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="primary">
                    Return To Configuration
                </Button>
            </Link>
        </div>
    );
}
