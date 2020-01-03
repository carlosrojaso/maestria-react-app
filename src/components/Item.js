import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const Item = (props) => {
    const itemsArray = props.itemsArray;
    return (
        itemsArray.map((item) => {
            return (
            <ListItem>
                <ListItemText primary={`item ` + item.toString()} />
            </ListItem>
            );
        })
    );
};

export default Item;