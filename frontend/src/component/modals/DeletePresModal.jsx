import Modal from '@mui/material/Modal';
import React from 'react';
import StyledBox from './StyledBox';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import deleteIcon from '../../assets/deleteIcon.svg';
import styled from 'styled-components';

const Img = styled.img`
  height: 20px;
  width: 20px;
  padding: 3px;
  box-sizing: border-box;
  border-radius: 9px;
  background-color: #F1F3F4;
`

const ButtonText = styled.span`
  style: inline;
  font-size: 15px;

  @media (max-width: 800px) {
    font-size: 10px;
  }
`

const DeletePresModal = ({store, actuallySetStore}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  /* delete deck and nav back to dashboard */
  const deleteDeck = () => {
    const newStore = {...store};
    const deckId = location.pathname.split('/')[2];
    newStore.decks =  store.decks?.filter(deck => deck.id !== Number(deckId));

    actuallySetStore(newStore);
    handleClose();
    navigate('/dashboard');
  };

  return (
    <>
      <Button
        variant='contained'
        size='small'
        onClick={handleOpen}
        startIcon={<Img src={deleteIcon} alt='Delete icon' />}
      >
        <ButtonText>Delete Presentation</ButtonText>
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
      >
        <StyledBox>
          <h2>Delete the presentation</h2>
          <p>Are you sure you want to delete the current presentation? This action cannot be undone!</p>
          <button onClick={deleteDeck}>Yes</button>
          <button onClick={handleClose}>No</button>
        </StyledBox>
      </Modal>
    </>
  );
};

export default DeletePresModal;