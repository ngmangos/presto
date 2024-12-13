import styled from 'styled-components';
import textIcon from '../../assets/textIcon.svg';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import React from 'react';
import StyledBox from './StyledBox';
import { Tooltip } from '@mui/material';

const StyledButton = styled(IconButton)`
  height: clamp(30px, 100%, 60px);
  width: auto;
`
const IconImg = styled('img')`
  height: clamp(30px, 100%, 60px);
  width: auto;
`

const AddText = ({ store, actuallySetStore, setStore, curSlideNum }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [fontSize, setFontSize] = React.useState(1);
  const [height, setHeight] = React.useState(40);
  const [width, setWidth] = React.useState(40);
  const [text, setText] = React.useState('');
  const [color, setColor] = React.useState('#000000');

  const addText = () => {
    const element = {
      type: 'text',
      height: height,
      width: width,
      fontSize: fontSize,
      top: 0,
      left: 0,
      text: text,
      color: color,
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
      <Tooltip title='Add Text'>
        <StyledButton aria-label='Add Text' onClick={handleOpen}>
          <IconImg src={textIcon} alt='Text icon'/>
        </StyledButton>
      </Tooltip>

      <Modal
        open={open}
        onClose={handleClose}
      >
        <StyledBox>
          <h2>Add Text</h2>
          <label htmlFor='height'>Height</label>
          <input type='number' id='height' value={height} onChange={e => setHeight(e.target.value)}></input>
          <label htmlFor='width'>Width</label>
          <input type='number' id='width' value={width} onChange={e => setWidth(e.target.value)}></input>
          <label htmlFor='fontSize'>Font size</label>
          <input type='number' id='fontSize' value={fontSize} name='fontSize' onChange={e => setFontSize(e.target.value)}></input>
          <label htmlFor='text'>Text</label>
          <textarea id='text' name='text' style={{color: color}} onChange={e => setText(e.target.value)}/>
          <label htmlFor='color'>Colour</label>
          <input type='color' id='color' name='color' value={color} onChange={e => setColor(e.target.value)}/>
          <button onClick={addText}>Confirm</button>
        </StyledBox>
      </Modal>
    </>
  );  
}

export default AddText;