import React from 'react';
import './Footer.css';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const MyFooter = (props) => {

    return (
        <React.Fragment>
        <div className="fabContainer">
            <Fab onClick={() => props.handleOpen()} color="primary" aria-label="add">
                <AddIcon />
            </Fab>
        </div>
        <div className="footer">
            react-app
        </div>
        </React.Fragment>
    );
}

export default MyFooter;