import Modal from '@mui/material/Modal';
import React from 'react';
import StyledBox from './StyledBox';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import deleteIcon from '../../assets/deleteIcon.svg';
import IconButton from '@mui/material/IconButton';
import { Tooltip } from '@mui/material';

const StyledButton = styled(IconButton)`
  height: 40px;
  width: 40px;
`
const IconImg = styled('img')`
  height: 35px;
  width: 35px;
`

const DeleteSlideModal = ({slideNum, setSlideNum, store, actuallySetStore}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  /* delete slide and navigate to previous slide (next if on first slide) */
  const deleteSlide = () => {
    const newStore = {...store};
    const deckId = location.pathname.split('/')[2];
    const curDeck = newStore.decks?.find(deck => deck.id === Number(deckId));

    /* delete current slide */
    curDeck.slides = curDeck.slides.filter(slide => slide.slideNum !== slideNum);

    curDeck.slides.forEach(slide => {
      if (slide.slideNum > slideNum) {
        slide.slideNum -= 1;
      }
    });

    if (slideNum !== 1) {
      setSlideNum(slideNum - 1);
      navigate(`/presentation/${deckId}/${slideNum - 1}`);
    }

    actuallySetStore(newStore);
    handleClose();
  }

  return (
    <>
      <Tooltip title='Delete Slide'>
        <StyledButton aria-label='Delete Slide' onClick={handleOpen}>
          <IconImg src={deleteIcon} alt='Delete slide icon'/>
        </StyledButton>
      </Tooltip>

      <Modal
        open={open}
        onClose={handleClose}
      >
        <StyledBox>
          <h2>Delete the slide</h2>
          <p>Are you sure you want to delete the current slide? This action cannot be undone!</p>
          <button onClick={deleteSlide}>Yes</button>
          <button onClick={handleClose}>No</button>
        </StyledBox>
      </Modal>
    </>
  )
}

export default DeleteSlideModal;