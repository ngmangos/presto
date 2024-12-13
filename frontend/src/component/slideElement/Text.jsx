import React from 'react';
import styled from 'styled-components';
import SlideElement from './SlideElement'
import Modal from '@mui/material/Modal';
import StyledBox from '../modals/StyledBox';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const StyledText = styled.div`
  height: 100%;
  width: 100%;
  margin: 0;
  overflow: hidden;
  box-sizing: border-box;
  border: 2px solid #CCCCCC;
`

const arialString = 'Arial, Helvetica, sans-serif';
const timesNewString = '"Times New Roman", Times, serif';
const calibriString = '"Calibri", sans-serif';

const arialKey = 'arial';
const calibriKey = 'calibri';
const timesNewKey = 'timesNew'

const Text = ({ store, setStore, actuallySetStore, text, color, height, width, fontSize, top, left, elementIndex, curSlideNum, font, deleteElement }) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [textCurr, setTextCurr] = React.useState(text);
  const [fontSizeCurr, setFontSizeCurr] = React.useState(fontSize);
  const [colorCurr, setColorCurr] = React.useState(color);
  const [menuAnchor, setMenuAnchor] = React.useState(null);
  const [widthCurr, setWidthCurr] = React.useState(width);
  const [heightCurr, setHeightCurr] = React.useState(height);
  const menuOpen = Boolean(menuAnchor);

  const fontToFamily = (fontKey) => {
    if (fontKey === calibriKey) {
      return calibriString;
    } else if (fontKey === arialKey) {
      return arialString;
    } else if (fontKey === timesNewKey) {
      return timesNewString;
    }
    return calibriString;
  }
  const [fontFamily, setFontFamily] = React.useState(fontToFamily(font));

  React.useEffect(() => {
    setFontFamily(font);
  }, [font]);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const updateText = () => {
    const newStore = {...store}

    const deckId = location.pathname.split('/')[2];
    const curDeck = newStore.decks?.find(deck => deck.id === Number(deckId));
    const curSlide = curDeck.slides?.find(slide => slide.slideNum === Number(curSlideNum));
    const curElement = curSlide.elements[elementIndex];
    curElement.text = textCurr;
    curElement.fontSize = fontSizeCurr;
    curElement.color = colorCurr;
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
        <StyledText style={{ color: colorCurr, fontSize: `${fontSizeCurr}em`, fontFamily: fontFamily }}>
          {textCurr}
        </StyledText>
      </SlideElement>

      <Modal
        open={modalOpen}
        onClose={handleModalClose}
      >
        <StyledBox>
          <h2>Edit Text</h2>
          <label htmlFor='height'>Height</label>
          <input type='number' id='height' value={heightCurr} onChange={e => setHeightCurr(e.target.value)}></input>
          <label htmlFor='width'>Width</label>
          <input type='number' id='width' value={widthCurr} onChange={e => setWidthCurr(e.target.value)}></input>
          <label htmlFor='fontSize'>Font size</label>
          <input type='number' id='fontSize' value={fontSizeCurr} name='fontSize' onChange={e => setFontSizeCurr(e.target.value)}/>
          <label htmlFor='text'>Text</label>
          <textarea id='text' name='text' value={textCurr} style={{color: colorCurr}} onChange={e => setTextCurr(e.target.value)}/>
          <label htmlFor='color'>Colour</label>
          <input type='color' id='color' name='color' value={colorCurr} onChange={e => setColorCurr(e.target.value)}/>
          <button onClick={updateText}>Confirm</button>
        </StyledBox>
      </Modal>
      <Menu
        anchorEl={menuAnchor}
        open={menuOpen}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'delete-button'
        }}>
        <MenuItem onClick={handleDelete}>Delete Text</MenuItem>
      </Menu>
    </>
  );
}

export default Text