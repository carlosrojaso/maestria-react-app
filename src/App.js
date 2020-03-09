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

import AWSAppSyncClient from 'aws-appsync';
import awsmobile from './aws-exports';
import { ApolloProvider } from 'react-apollo';
import { Rehydrated } from 'aws-appsync-react';


import { notesDataApi } from './data/notes-data-api';
import uuidv4 from 'uuid/v4';

const App = () => {

  const [itemsArray, setItemsArray] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [itemToEdit, setItemToEdit] = useState({});

  useEffect(() => {
    notesDataApi.getTasks()
    .then((res) => res.json())
    .then((items) => {
      const allItems = items.map((item) => ({id: item.id, name: item.title, description: item.body}));
      setItemsArray(allItems);
      });
  }, []);

  const addToList = (item) => {

    const tmpList = [...itemsArray];

    const newIndex = uuidv4();
    item.id = newIndex;

    notesDataApi.createTask(item)
        .then(res => res.json())
        .then(
          () => {
            tmpList.push(item);

            setItemsArray(tmpList);
          }
        );
  };

  const editFromList = (item) => {
    
    const tmpList = [...itemsArray];

    const itemIndex = itemsArray.findIndex((elem) => (elem.id === item.id));

    notesDataApi.putTask(item)
          .then(res => res.json())
          .then(
            () => {
              tmpList[itemIndex] = {...item};

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

  const removeFromList = (key) => {
 
    const tmpList = [...itemsArray];

    const itemIndex = itemsArray.findIndex((item) => (item.id === key));
    notesDataApi.deleteTask(key)
        .then(res => res.json())
        .then(
          () => {
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
};

// export default App;

const client = new AWSAppSyncClient({
  url: awsmobile.aws_appsync_graphqlEndpoint,
  region: awsmobile.aws_appsync_region,
  auth: {
    type: awsmobile.aws_appsync_authenticationType,
    apiKey: awsmobile.aws_appsync_apiKey
  }
});

const WithProvider = () => (
  <ApolloProvider client={client}>
    <Rehydrated>
      <App />
    </Rehydrated>
  </ApolloProvider>
)

export default WithProvider;
