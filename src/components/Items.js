import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Item from './Item';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

const Items = () => {
    const classes = useStyles();
    const itemsArray = [0,1,2,3,4,5,6,7,8,9,10];
    return (
        <div className={classes.root}>
          <List>
            <Item itemsArray={itemsArray}/>
          </List>
        </div>
      );
};

export default Items;