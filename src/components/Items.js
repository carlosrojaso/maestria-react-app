import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Item from './Item';
import { DummyData } from '../data/dummy-data';

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
    const itemsArray = DummyData;
    return (
        <div className={classes.root}>
          <List>
            <Item itemsArray={itemsArray}/>
          </List>
        </div>
      );
};

export default Items;