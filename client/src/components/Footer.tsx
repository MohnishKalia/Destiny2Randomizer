import React from 'react'
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            marginTop: '30vh',
        },
    }),
);

export default function Footer() {
    const classes = useStyles();
    return (
        <div className={classes.root}>

        </div>
    )
}
