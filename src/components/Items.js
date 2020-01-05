import React from 'react';
import PropTypes from "prop-types";
import { createStyles, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Item from './Item';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '100%',
      backgroundColor: theme.palette.background.paper,
    },
  })
);

const Items = (props) => {
    const classes = useStyles();
    
    return (
        <div className={classes.root}>
          <List>
            <Item
              items={props.items}
              edit={props.getItemToEdit}
              remove={props.removeFromList}/>
          </List>
        </div>
      );
};

Items.propTypes = {
  items: PropTypes.array,
  removeFromList: PropTypes.func
};

export default Items;