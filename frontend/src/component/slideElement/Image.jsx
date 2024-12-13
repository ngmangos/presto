import React from 'react';
import styled from 'styled-components';
import SlideElement from './SlideElement'
import Modal from '@mui/material/Modal';
import StyledBox from '../modals/StyledBox';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const StyledImage = styled.img`
    height: 100%;
    width: 100%;
    margin: 0;
    overflow: hidden;
    box-sizing: border-box;
`

const FlexedDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const Image = ({ store, setStore, actuallySetStore, image, height, width, tag, top, left, elementIndex, curSlideNum, deleteElement }) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [newImage, setNewImage] = React.useState(false);
  const [imageCurr, setImageCurr] = React.useState(image);
  const [imageLoading, setImageLoading] = React.useState(false);
  const [tagCurr, setTagCurr] = React.useState(tag);
  const [widthCurr, setWidthCurr] = React.useState(width);
  const [heightCurr, setHeightCurr] = React.useState(height);
  const [menuAnchor, setMenuAnchor] = React.useState(null);
  const menuOpen = Boolean(menuAnchor);
  const [uploadFile, setUploadFile] = React.useState(false);

  const handleModalOpen = () => {
    setNewImage(false);
    setModalOpen(true);
  };
  const handleModalClose = () => setModalOpen(false);

  const updateImage = () => {
    if (!imageLoading) {
      const newStore = {...store}
      const deckId = location.pathname.split('/')[2];
      const curDeck = newStore.decks?.find(deck => deck.id === Number(deckId));
      const curSlide = curDeck.slides?.find(slide => slide.slideNum === Number(curSlideNum));
      const curElement = curSlide.elements[elementIndex];
      if (newImage) curElement.image = imageCurr;
      else setImageCurr(image);
      curElement.tag = tagCurr;
      curElement.height = heightCurr;
      curElement.width = widthCurr;

      setStore(newStore);
      actuallySetStore(newStore);
      handleModalClose();
    }
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

  const handleRadioChange = () => {
    setUploadFile(!uploadFile);
  }

  const handleFile = (e) => {
    setImageLoading(true);
    const reader = new FileReader()

    reader.readAsDataURL(e.target.files[0])

    reader.onload = () => {
      setImageCurr(reader.result);
      setImageLoading(false);
    }
  }

  const handleURL = (e) => {
    setImageLoading(true);
    fetch(e.target.value)
      .then(response => response.blob())
      .then(blob => {
        const reader = new FileReader()
        reader.readAsDataURL(blob)

        reader.onload = () => {
          setImageCurr(reader.result)
          setImageLoading(false);
        }
      })
  }

  const handleNewImageCheckbox = (e) => {
    setNewImage(e.target.checked);
  }

  return (
    <>
      <SlideElement height={height} width={width} top={top} left={left} store={store} actuallySetStore={actuallySetStore} setStore={setStore} elementIndex={elementIndex} curSlideNum={curSlideNum} openModal={handleModalOpen} openMenu={handleMenuOpen}>
        <StyledImage src={imageCurr} alt={tagCurr}/>
      </SlideElement>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
      >
        <StyledBox>
          <h2>Edit Image</h2>
          <label htmlFor='height'>Height</label>
          <input type='number' id='height' value={heightCurr} onChange={e => setHeightCurr(e.target.value)}></input>
          <label htmlFor='width'>Width</label>
          <input type='number' id='width' value={widthCurr} onChange={e => setWidthCurr(e.target.value)}></input>
          <label htmlFor='tag'>Alt tag</label>
          <input type='text' id='tag' name='tag' value={tagCurr} onChange={e => setTagCurr(e.target.value)}></input>
          <label htmlFor='newImage' style={{ display: 'flex', alignItems: 'center' }}>
            Upload new image
            <input type='checkbox' id='newImage' name='newImage' onChange={handleNewImageCheckbox}></input>
          </label>
          { newImage && (
            <>
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
            </>
          )}
          <button onClick={updateImage}>Confirm</button>
        </StyledBox>
      </Modal>
      <Menu
        anchorEl={menuAnchor}
        open={menuOpen}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'delete-button'
        }}>
        <MenuItem onClick={handleDelete}>Delete Image</MenuItem>
      </Menu>
    </>
  );
}

export default Image