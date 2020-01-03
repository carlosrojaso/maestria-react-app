import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const Item = (props) => {
    const itemsArray = props.itemsArray;
    return (
        itemsArray.map((item) => {
            return (
            <ListItem>
                <ListItemText 
                    primary={item.name}
                    secondary={item.description}
                />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete">
                      <EditIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
            </ListItem>
            );
        })
    );
};

export default Item;