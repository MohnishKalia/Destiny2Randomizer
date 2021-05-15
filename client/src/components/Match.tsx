import React, { useMemo } from 'react'
import { useStateContext } from '../store';
import { randomSelection } from '../utils';
import { maps } from '../data';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import Typography from '@material-ui/core/Typography';

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
    }),
);

export default function Match() {
    const classes = useStyles();
    const { state } = useStateContext();
    const selectedMap = useMemo(() => {
        const selectedMaps = state.maps.filter(map => map.selected).map(map => map.name);
        const [selectedMap] = randomSelection(selectedMaps, 1);
        return selectedMap;
    }, [state.maps]);

    return (
        <div>
            <Card className={classes.root}>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    image={maps[selectedMap]}
                    title="Contemplative Reptile"
                    className={classes.media}
                />
                <div className={classes.overlay}>
                    <Typography variant="button">The Random Map Is:</Typography>
                    <Typography variant="h3">{selectedMap}</Typography>
                </div>
            </Card>
        </div>
    );
}
