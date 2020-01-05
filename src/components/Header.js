import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    }
  }));

const MyHeader = () => {
    const classes = useStyles();

    return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography className={classes.title} variant="h6" color="inherit">
            react-app
          </Typography>
          <Button href="/" color="inherit">Home</Button>
          <Button href="/about" color="inherit">About</Button>
        </Toolbar>
      </AppBar>
    </div>
    );
}

export default MyHeader;