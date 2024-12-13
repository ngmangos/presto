
import Modal from '@mui/material/Modal';
import React from 'react';
import StyledBox from './StyledBox';
import { Button } from '@mui/material';

const NewPresModal = ({store, actuallySetStore}) => {
  const [newDeckTitle, setNewDeckTitle] = React.useState('');
  const [newDeckThumbnail, setNewDeckThumbnail] = React.useState('#FFFFFF');
  const [newDeckDesc, setNewDeckDesc] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const newDeck = () => {
    const newStore = {...store};
    // Initialize 'decks' if it doesn't exist
    if (!Array.isArray(newStore.decks)) {
      newStore.decks = [];
    }

    // Generate a unique deck id (based on creation time)
    // Were Presto to take off and become a worldwide hit
    // we would use a more random number generator
    // this will do for the scope of this assessment
    const newDeckId = Date.now();

    // Add a new deck
    newStore.decks.push({
      id: newDeckId,
      title: newDeckTitle,
      desc: newDeckDesc,
      thumbnail: newDeckThumbnail,
      background: { type: 'color', background: '#FFFFFF' },
      slides: [
        {
          slideNum: 1,
          elements: [],
          font: 'calibri',
          background: { type: 'default' },
          id: Date.now()
        }
      ],
      versions: [
        {
          versionNum: 1,
          timeSaved: newDeckId,
          slides: [
            {
              slideNum: 1,
              elements: [],
              font: 'calibri'
            }
          ]
        }
      ]
    });
    actuallySetStore(newStore);
    setNewDeckTitle('');
    handleClose();
  }

  return (
    <>
      <Button variant='contained' size='small' onClick={handleOpen}>+ New Presentation</Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <StyledBox>
          <h2>Create new presentation</h2>
          <label htmlFor='title'>Title</label>
          <input type="text" id="title" name="title" value={newDeckTitle} onChange={e => setNewDeckTitle(e.target.value) }/>
          <label htmlFor='description'>Description</label>
          <input type="text" id="description" name="description" value={newDeckDesc} onChange={e => setNewDeckDesc(e.target.value) }/>
          <label htmlFor='thumbnail'>Thumbnail colour</label>
          <input type="text" id="thumbnail" name="thumbnail" value={newDeckThumbnail} onChange={e => setNewDeckThumbnail(e.target.value) }/>
          <button onClick={newDeck}>Confirm</button>
          <button onClick={handleClose}>Cancel</button>
        </StyledBox>
      </Modal>
    </>
  )
}

export default NewPresModal