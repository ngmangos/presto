import Modal from '@mui/material/Modal';
import React from 'react';
import StyledBox from './StyledBox';
import IconButton from '@mui/material/IconButton';
import penIcon from '../../assets/penIcon.svg';
import Tooltip from '@mui/material/Tooltip';
import styled from 'styled-components';

const StyledButton = styled(IconButton)`
  height: 20px;
  width: 20px;
  display: inline;
  margin-left: 5px;
`

const IconImg = styled('img')`
  height: 25px;
  width: 25px;
`

const EditTitleModal = ({title, setTitle, store, actuallySetStore}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /* set new deck title when edited */
  const editTitle = () => {
    const newStore = {...store};
    const deckId = location.pathname.split('/')[2];
    const curDeck = store.decks?.find(deck => deck.id === Number(deckId)) || null;

    curDeck.title = title;
    actuallySetStore(newStore);
    handleClose();
  }

  return (
    <>
      <Tooltip title='Edit Title'>
        <StyledButton aria-label='Edit Title' onClick={handleOpen}>
          <IconImg src={penIcon} alt='Edit icon'/>
        </StyledButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <StyledBox>
          <h2>Edit presentation title</h2>
          <label htmlFor='title'>Title</label>
          <input type="text" id="title" name="title" value={title} onChange={e => setTitle(e.target.value) }/>
          <button onClick={editTitle}>Confirm</button>
        </StyledBox>
      </Modal>
    </>
  )
}

export default EditTitleModal