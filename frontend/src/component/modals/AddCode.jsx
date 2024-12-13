import styled from 'styled-components';
import codeIcon from '../../assets/codeIcon.svg';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import React from 'react';
import StyledBox from './StyledBox';
import Tooltip from '@mui/material/Tooltip';

const StyledButton = styled(IconButton)`
  height: clamp(30px, 100%, 60px);
  width: auto;
`
const IconImg = styled('img')`
  height: clamp(30px, 100%, 60px);
  width: auto;
`

const AddCode = ({ store, actuallySetStore, setStore, curSlideNum }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [fontSize, setFontSize] = React.useState(1);
  const [height, setHeight] = React.useState(40);
  const [width, setWidth] = React.useState(40);
  const [code, setCode] = React.useState('');

  const addCode = () => {
    const element = {
      type: 'code',
      height: height,
      width: width,
      fontSize: fontSize,
      top: 0,
      left: 0,
      code: code,
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
      <Tooltip title='Add Code'>
        <StyledButton aria-label='Add Code' onClick={handleOpen}>
          <IconImg src={codeIcon} alt='Code icon'/>
        </StyledButton>
      </Tooltip>

      <Modal
        open={open}
        onClose={handleClose}
      >
        <StyledBox>
          <h2>Add Code</h2>
          <label htmlFor='height'>Height</label>
          <input type='number' id='height' value={height} onChange={e => setHeight(e.target.value)}></input>
          <label htmlFor='width'>Width</label>
          <input type='number' id='width' value={width} onChange={e => setWidth(e.target.value)}></input>
          <label htmlFor='fontSize'>Font size</label>
          <input type='number' id='fontSize' value={fontSize} name='fontSize' onChange={e => setFontSize(e.target.value)}></input>
          <label htmlFor='code'>Code</label>
          <textarea id='code' name='code' onChange={e => setCode(e.target.value)}/>
          <button onClick={addCode}>Confirm</button>
        </StyledBox>
      </Modal>
    </>
  );  
}

export default AddCode;