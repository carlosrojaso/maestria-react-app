import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: '80%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  formStyle: {
    width: '100%'
  }
}));

const SimpleModal = (props) => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({});
    const classes = useStyles();
    const modalStyle = getModalStyle();

    useEffect(() => {
      if(props.isEditing) {
        setName(props.itemToEdit.name);
        setDescription(props.itemToEdit.description);
      } else {
        setName('');
        setDescription('');
      }
    }, [props.isEditing, props.itemToEdit]);

    const save = () => {

      if (name.length < 4) {
        setErrors({message: 'Name must be at least 4 characters.'});
      } else if(description.length < 4){
        setErrors({message: 'Description must be at least 4 characters.'})
      } else {

        const newItem = {
          name: name,
          description
        };

        if(!props.isEditing) {
          props.addToList(newItem);
        } else {
          newItem.id = props.itemToEdit.id;
          props.editFromList(newItem);
        }

        props.handleClose();
        setErrors({});
      }
    }

    return (
        <div>
            <Modal
                open={props.open}
                onClose={props.handleClose}
            >
                <div style={modalStyle} className={classes.paper}>
                  <div className="alert-message">{errors && errors.message}</div>
                <form className={classes.formStyle} noValidate autoComplete="off">
                  <TextField 
                    id="name"
                    label="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    style={{ margin: 5 }}
                    fullWidth
                  />
                  <TextField
                    id="description"
                    label="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    style={{ margin: 5 }}
                    multiline
                    fullWidth
                    rows="4"
                  />
                </form>
                <Button 
                  onClick={() => props.handleClose()}
                  style={{ margin: 5 }}
                  variant="contained" 
                  color="secondary">
                    Cancel
                </Button>
                <Button 
                  onClick={() => save()}
                  style={{ margin: 5 }}
                  variant="contained"
                  color="primary">
                    Save
                </Button>
                </div>
            </Modal>
    </div>
    );
};

export default SimpleModal;