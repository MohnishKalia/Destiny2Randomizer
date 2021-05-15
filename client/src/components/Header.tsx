import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import LowPriority from '@material-ui/icons/LowPriority';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: theme.spacing(2),
        alignItems: 'center'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function Header() {
    const classes = useStyles();
    return (
        <AppBar className={classes.root} position="static">
            <Toolbar>
                <Link to="/">
                    <IconButton edge="start" className={classes.menuButton} color="default" aria-label="menu">
                        <LowPriority />
                    </IconButton>
                </Link>
                <Typography variant="h6" className={classes.title}>
                    Crucible Randomizer
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
