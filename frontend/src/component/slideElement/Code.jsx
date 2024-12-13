import React from 'react';
import styled from 'styled-components';
import detectLang from 'lang-detector';
import SlideElement from './SlideElement'
import Modal from '@mui/material/Modal';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import StyledBox from '../modals/StyledBox';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const StyledCode = styled(SyntaxHighlighter)`
  height: 100%;
  width: 100%;
  margin: 0;
  overflow: auto;
  box-sizing: border-box;
`

const Code = ({ store, setStore, actuallySetStore, code, height, width, fontSize, top, left, elementIndex, curSlideNum, deleteElement }) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [codeCurr, setCodeCurr] = React.useState(code);
  const [fontSizeCurr, setFontSizeCurr] = React.useState(fontSize);
  const [menuAnchor, setMenuAnchor] = React.useState(null);
  const [widthCurr, setWidthCurr] = React.useState(width);
  const [heightCurr, setHeightCurr] = React.useState(height);
  const menuOpen = Boolean(menuAnchor);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const [lang, setLang] = React.useState(detectLang(codeCurr));
  React.useEffect(() => {
    setLang(detectLang(codeCurr));
  }, [codeCurr])

  const updateCode = () => {
    const newStore = {...store}

    const deckId = location.pathname.split('/')[2];
    const curDeck = newStore.decks?.find(deck => deck.id === Number(deckId));
    const curSlide = curDeck.slides?.find(slide => slide.slideNum === Number(curSlideNum));
    const curElement = curSlide.elements[elementIndex];
    curElement.code = codeCurr;
    curElement.fontSize = fontSizeCurr;
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
        <StyledCode language={lang.toLowerCase()} style={docco} customStyle={{ fontSize: `${fontSizeCurr}em`}}>
          {codeCurr}
        </StyledCode>
      </SlideElement>

      <Modal
        open={modalOpen}
        onClose={handleModalClose}
      >
        <StyledBox>
          <h2>Edit Code</h2>
          <label htmlFor='height'>Height</label>
          <input type='number' id='height' value={heightCurr} onChange={e => setHeightCurr(e.target.value)}></input>
          <label htmlFor='width'>Width</label>
          <input type='number' id='width' value={widthCurr} onChange={e => setWidthCurr(e.target.value)}></input>
          <label htmlFor='fontSize'>Font size</label>
          <input type='number' id='fontSize' value={fontSizeCurr} name='fontSize' onChange={e => setFontSizeCurr(e.target.value)}/>
          <label htmlFor='code'>Code</label>
          <textarea id='code' name='code' value={codeCurr} onChange={e => setCodeCurr(e.target.value)}/>
          <button onClick={updateCode}>Confirm</button>
        </StyledBox>
      </Modal>
      <Menu
        anchorEl={menuAnchor}
        open={menuOpen}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'delete-button'
        }}>
        <MenuItem onClick={handleDelete}>Delete Code</MenuItem>
      </Menu>
    </>
  );
}

export default Code