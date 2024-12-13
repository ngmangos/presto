import styled from 'styled-components';
import videoIcon from '../../assets/videoIcon.svg';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import React from 'react';
import StyledBox from './StyledBox';
import { Tooltip } from '@mui/material';

const StyledButton = styled(IconButton)`
  height: clamp(30px, 100%, 60px);
  width: auto;
`;

const IconImg = styled('img')`
  height: clamp(30px, 100%, 60px);
  width: auto;
`;

const AddVideo = ({ store, actuallySetStore, setStore, curSlideNum }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [height, setHeight] = React.useState(40);
  const [width, setWidth] = React.useState(40);
  const [video, setVideo] = React.useState('');
  const [autoplay, setAutoplay] = React.useState(false);

  const addVideo = () => {
    const element = {
      type: 'video',
      height: height,
      width: width,
      autoplay: autoplay,
      top: 0,
      left: 0,
      video: video,
      id: Date.now()
    }
    const newStore = {...store};
    const deckId = location.pathname.split('/')[2];
    const curDeck = newStore.decks?.find(deck => deck.id === Number(deckId));
    const curSlide = curDeck.slides?.find(slide => slide.slideNum === Number(curSlideNum));
    curSlide.elements.push(element);
    actuallySetStore(newStore);
    setStore(newStore);
    handleClose();
  }

  return (
    <>
      <Tooltip title='Add Video'>
        <StyledButton aria-label='Add Video' onClick={handleOpen}>
          <IconImg src={videoIcon} alt='Video icon'/>
        </StyledButton>
      </Tooltip>

      <Modal
        open={open}
        onClose={handleClose}
      >
        <StyledBox>
          <h2>Add Video</h2>
          <label htmlFor='height'>Height</label>
          <input type='number' id='height' value={height} onChange={e => setHeight(e.target.value)}></input>
          <label htmlFor='width'>Width</label>
          <input type='number' id='width' value={width} onChange={e => setWidth(e.target.value)}></input>
          <label htmlFor='autoplay' style={{ display: 'flex', alignItems: 'center' }}>
            Autoplay
            <input type='checkbox' id='autoplay' checked={autoplay} name='autplay' onChange={e => setAutoplay(e.target.checked)}></input>
          </label>
          <label htmlFor='video'>Video</label>
          <input type='url' id='video' name='video' onChange={e => setVideo(e.target.value)}/>
          <button onClick={addVideo}>Confirm</button>
        </StyledBox>
      </Modal>
    </>
  );
}

export default AddVideo;