import React from 'react';
import SlideElement from './SlideElement'
import Modal from '@mui/material/Modal';
import StyledBox from '../modals/StyledBox';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ReactPlayer from 'react-player'

const Video = ({ store, setStore, actuallySetStore, video, height, width, autoplay, top, left, elementIndex, curSlideNum, deleteElement }) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [videoCurr, setVideoCurr] = React.useState(video);
  const [autoplayCurr, setAutoplayCurr] = React.useState(autoplay);
  const [menuAnchor, setMenuAnchor] = React.useState(null);
  const [widthCurr, setWidthCurr] = React.useState(width);
  const [heightCurr, setHeightCurr] = React.useState(height);
  const menuOpen = Boolean(menuAnchor);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const updateVideo = () => {
    const newStore = {...store}

    const deckId = location.pathname.split('/')[2];
    const curDeck = newStore.decks?.find(deck => deck.id === Number(deckId));
    const curSlide = curDeck.slides?.find(slide => slide.slideNum === Number(curSlideNum));
    const curElement = curSlide.elements[elementIndex];
    curElement.video = videoCurr;
    curElement.autoplay = autoplayCurr;
    curElement.height = heightCurr;
    curElement.width = widthCurr;

    setStore(newStore);
    actuallySetStore(newStore);
    handleModalClose();
  }

  const handleMenuOpen = (event) => {
    event.preventDefault();
    setMenuAnchor(event.currentTarget);
  }

  const handleMenuClose = () => {
    setMenuAnchor(null);
  }

  const handleDelete = () => {
    deleteElement(elementIndex);
    handleMenuClose();
  };

  return (
    <>
      <SlideElement height={height} width={width} top={top} left={left} store={store} actuallySetStore={actuallySetStore} setStore={setStore} elementIndex={elementIndex} curSlideNum={curSlideNum} openModal={handleModalOpen} openMenu={handleMenuOpen}>
        <ReactPlayer url={videoCurr} loop={true} width='100%' height='100%' style={{
          margin: 0,
          overflow: 'hidden',
          boxSizing: 'border-box',
          pointerEvents: 'none'
        }}/>
      </SlideElement>

      <Modal
        open={modalOpen}
        onClose={handleModalClose}
      >
        <StyledBox>
          <h2>Edit Video</h2>
          <label htmlFor='height'>Height</label>
          <input type='number' id='height' value={heightCurr} onChange={e => setHeightCurr(e.target.value)}></input>
          <label htmlFor='width'>Width</label>
          <input type='number' id='width' value={widthCurr} onChange={e => setWidthCurr(e.target.value)}></input>
          <label htmlFor='autoplay' style={{ display: 'flex', alignItems: 'center' }}>
            Autoplay
            <input type='checkbox' id='autoplay' checked={autoplayCurr} name='autplay' onChange={e => setAutoplayCurr(e.target.checked)}></input>
          </label>
          <label htmlFor='video'>Video</label>
          <input type='url' id='video' name='video' value={videoCurr} onChange={e => setVideoCurr(e.target.value)}/>
          <button onClick={updateVideo}>Confirm</button>
        </StyledBox>
      </Modal>
      <Menu
        anchorEl={menuAnchor}
        open={menuOpen}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'delete-button'
        }}>
        <MenuItem onClick={handleDelete}>Delete Video</MenuItem>
      </Menu>
    </>
  );
}

export default Video