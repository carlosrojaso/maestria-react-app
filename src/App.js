import React, {useState, useEffect} from 'react';
import './App.css';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import MyHeader from './components/Header';
import MyFooter from './components/Footer';
import Items from './components/Items';
import SimpleModal from './components/SimpleModal';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add'
import uuidv4 from 'uuid/v4';

import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { DataStore } from "@aws-amplify/datastore";
import { Todo } from './models';

Amplify.configure(awsconfig)

const App = () => {

  const [itemsArray, setItemsArray] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [itemToEdit, setItemToEdit] = useState({});

  useEffect(() => {
      getTasks().then(
        (elems) => {
          const allItems = elems;
          setItemsArray(allItems);
        }
      );
  }, []);

  const getTasks = async () => {
    const todos = await DataStore.query(Todo);
    return todos.map((elem) => ({...elem}));
  }

  const addToList = async (item) => {

    const tmpList = [...itemsArray];

    const newIndex = uuidv4();
    item.id = newIndex;

    await DataStore.save(new Todo(
      item
    )).then(
      () => {
        tmpList.push(item);

        setItemsArray(tmpList);
      }
    );
  };

  const editFromList = async (item) => {
    
    const tmpList = [...itemsArray];

    const original = await DataStore.query(Todo, item.id);

    await DataStore.save(
      Todo.copyOf(original, updated => {
        updated.name = item.name;
        updated.description = item.description;
      })
    ).then(
      () => {
        const originalNote = tmpList.findIndex((elem) => (elem.id === item.id));
        tmpList[originalNote] = {...item};

        setItemsArray(tmpList);
        setItemToEdit({});
        setIsEditing(false);

        handleClose();
      }
    );
  };

  const getItemToEdit = (id) => {
    
    const itemIndex = itemsArray.findIndex((elem) => (elem.id === id));
    const tmpItem = {...itemsArray[itemIndex]};

    setItemToEdit(tmpItem);
    setIsEditing(true);

    handleOpen();
  };

  const removeFromList = async (key) => {
 
    const tmpList = [...itemsArray];

    const todelete = await DataStore.query(Todo, key);

    DataStore.delete(todelete).then(
      () => {
        const itemIndex = itemsArray.findIndex((item) => (item.id === key));
        tmpList.splice(itemIndex,1);

        setItemsArray(tmpList);
      }
    );
  };

  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  
  return (
    <React.Fragment>
      <CssBaseline />
      <MyHeader/>
      <Container>
        <Items 
          items={itemsArray}
          getItemToEdit={getItemToEdit}
          removeFromList={removeFromList}
        />
      </Container>
      <SimpleModal
        open={openModal}
        handleClose={handleClose}
        addToList={addToList}
        editFromList={editFromList}
        isEditing={isEditing}
        itemToEdit={itemToEdit}
      />
      <div className="fabContainer">
        <Fab onClick={() => handleOpen()} color="primary" aria-label="add">
            <AddIcon />
        </Fab>
      </div>
      <MyFooter/>
    </React.Fragment>
  );
}

export default App;
