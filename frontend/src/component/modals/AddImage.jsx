import styled from 'styled-components';
import imageIcon from '../../assets/imageIcon.svg';
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

const FlexedDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const AddImage = ({ store, actuallySetStore, setStore, curSlideNum }) => {
  const [open, setOpen] = React.useState(false);
  const [uploadFile, setUploadFile] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [height, setHeight] = React.useState(40);
  const [width, setWidth] = React.useState(40);
  const [image, setImage] = React.useState('');
  const [tag, setTag] = React.useState('');

  const addImage = () => {
    if (image !== '') {
      const element = {
        type: 'image',
        height: height,
        width: width,
        top: 0,
        left: 0,
        image: image,
        tag: tag,
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
  }

  const handleRadioChange = () => {
    setUploadFile(!uploadFile);
  }

  const handleFile = (e) => {
    const reader = new FileReader()

    reader.readAsDataURL(e.target.files[0])

    reader.onload = () => {
      setImage(reader.result)
    }
  }

  const handleURL = (e) => {
    fetch(e.target.value)
      .then(response => response.blob())
      .then(blob => {
        const reader = new FileReader()
        reader.readAsDataURL(blob)

        reader.onload = () => {
          setImage(reader.result)
        }
      })
  }

  return (
    <>
      <Tooltip title='Add Image'>
        <StyledButton aria-label='Add Image' onClick={handleOpen}>
          <IconImg src={imageIcon} alt='Image icon'/>
        </StyledButton>
      </Tooltip>

      <Modal
        open={open}
        onClose={handleClose}
      >
        <StyledBox>
          <h2>Add Image</h2>
          <label htmlFor='height'>Height</label>
          <input type='number' id='height' value={height} onChange={e => setHeight(e.target.value)}></input>
          <label htmlFor='width'>Width</label>
          <input type='number' id='width' value={width} onChange={e => setWidth(e.target.value)}></input>
          <label htmlFor='tag'>Alt tag</label>
          <input type='text' id='tag' name='tag' value={tag} onChange={e => setTag(e.target.value)}></input>
          <FlexedDiv>
            <FlexedDiv>
              <label htmlFor='uploadFile'>Upload image</label>
              <input type='radio' name='imageOptions' id='uploadFile' checked={uploadFile} onChange={handleRadioChange}></input>
            </FlexedDiv>
            <FlexedDiv>
              <label htmlFor='linkImage'>Link image</label>
              <input type='radio' name='imageOptions' id='linkImage' checked={!uploadFile} onChange={handleRadioChange}></input>
            </FlexedDiv> 
          </FlexedDiv>
          { uploadFile ? (
            <input type='file' onChange={handleFile}></input>
          ) : (
            <input type='url' onChange={handleURL}></input>
          )}
          <button onClick={addImage}>Confirm</button>
        </StyledBox>
      </Modal>
    </>
  );  
}

export default AddImage;