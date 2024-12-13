import Modal from '@mui/material/Modal';
import React from 'react';
import StyledBox from './StyledBox';
import styled from 'styled-components';
import { Button } from '@mui/material';

const StyledButton = styled(Button)`
  height: 40px;
  width: 165px;
  display: inline;
`

const buttonSx = {
  textTransform: 'none',
  color: 'white',
  borderColor: 'white',
}

const EditThumbnailModal = ({thumbnail, store, actuallySetStore}) => {
  const [thumbnailCurr, setThumbnailCurr] = React.useState(thumbnail);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    setThumbnailCurr(thumbnail);
  }, [thumbnail]);

  /* set new deck title when edited */
  const editThumbnail = () => {
    const newStore = {...store};
    const deckId = location.pathname.split('/')[2];
    const curDeck = store.decks?.find(deck => deck.id === Number(deckId)) || null;

    curDeck.thumbnail = thumbnailCurr;
    actuallySetStore(newStore);
    handleClose();
  }

  return (
    <>
      <StyledButton sx={buttonSx} variant='outlined' size='small' aria-label='Edit Thumbnail' onClick={handleOpen}>
          Edit Thumbnail
      </StyledButton>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <StyledBox>
          <h2>Edit presentation thumbnail</h2>
          <label htmlFor='thumbnail'>Thumbnail</label>
          <input type="color" id="thumbnail" name="thumbnail" value={thumbnailCurr} onChange={e => setThumbnailCurr(e.target.value) }/>
          <button onClick={editThumbnail}>Confirm</button>
        </StyledBox>
      </Modal>
    </>
  )
}

export default EditThumbnailModal