import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const Item = (props) => {
    const itemsArray = props.items;
    return (
        itemsArray.map((item) => {
            return (
            <ListItem
                key={item.id}
            >
                <ListItemText 
                    primary={item.name}
                    secondary={item.description}
                />
                <ListItemSecondaryAction>
                    <IconButton onClick={() => props.edit(item.id)} edge="end" aria-label="edit">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => props.remove(item.id)} edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
            </ListItem>
            );
        })
    );
};

export default Item;