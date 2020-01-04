import React, {useState} from 'react';
import './App.css';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import MyHeader from './components/Header';
import MyFooter from './components/Footer';
import Items from './components/Items';
import SimpleModal from './components/SimpleModal';

import { DummyData } from './data/dummy-data';

const App = () => {

  const [itemsArray, setItemsArray] = useState(DummyData);

  const removeFromOrder = (key) => {
 
    const tmpList = [...itemsArray];

    const itemIndex = itemsArray.findIndex((item) => (item.id === key))
    tmpList.splice(itemIndex,1);

    setItemsArray(tmpList);
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
          removeFromList={removeFromOrder}
        />
      </Container>
      <SimpleModal open={openModal} handleClose={handleClose}/>
      <MyFooter handleOpen={handleOpen}/>
    </React.Fragment>
  );
}

export default App;
