import Modal from '@mui/material/Modal';
import React from 'react';
import StyledBox from './StyledBox';
import styled from 'styled-components';
import Button from '@mui/material/Button';

const FlexedDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 40px;
  align-items: center;
`

const StyledButton = styled(Button)`
  height: 40px;
  width: 120px;
  display: inline;

  @media (max-width: 700px) {
    width: 85px;
  }
`

const ButtonText = styled.span`
  style: inline;
  font-size: 15px;
  line-height: 1.2;

  @media (max-width: 700px) {
    font-size: 10px;
  }
`

const imageKey = 'image';
const gradientKey = 'gradient';
const colorKey = 'color';


// const ChangeBackgroundModal = ({thumbnail, store, actuallySetStore, background, backgroundType}) => {
/*
  background: {
    type: 'default', 'image', 'gradient', 'color'
  }
*/
const ChangeBackgroundModal = ({ store, setStore, actuallySetStore, curSlideNum }) => {
  const [backgroundType, setBackgroundType] = React.useState(colorKey);
  const [backgroundColour, setBackgroundColour] = React.useState('#FFFFFF');
  const [backgroundGradient, setBackgroundGradient] = React.useState('#FFA500');
  const [backgroundImage, setBackgroundImage] = React.useState('');
  const [changeBackground, setChangeBackground] = React.useState(false)
  const [defaultCurr, setDefaultCurr] = React.useState(false)
  const [open, setOpen] = React.useState(false);
  const [uploadFile, setUploadFile] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFile = (e) => {
    const reader = new FileReader();

    reader.readAsDataURL(e.target.files[0]);

    reader.onload = () => {
      setBackgroundImage(reader.result);
    }
  }

  const handleURL = (e) => {
    fetch(e.target.value)
      .then(response => response.blob())
      .then(blob => {
        const reader = new FileReader()
        reader.readAsDataURL(blob)

        reader.onload = () => {
          setBackgroundImage(reader.result)
        }
      })
  }

  const editBackground = () => {
    const background = {
      type: backgroundType
    }
    if (backgroundType === colorKey) background.background = backgroundColour;
    if (backgroundType === gradientKey) background.background = backgroundGradient;
    if (backgroundType === imageKey) background.background = backgroundImage;

    const newStore = {...store}
    const deckId = location.pathname.split('/')[2];
    const curDeck = newStore.decks?.find(deck => deck.id === Number(deckId));
    if (changeBackground && defaultCurr) {
      curDeck.background = background;
    } else {
      const curSlide = curDeck.slides?.find(slide => slide.slideNum === Number(curSlideNum));
      if (!changeBackground) {
        curSlide.background = { type: 'default' };
      } else {
        curSlide.background = background;
      }
    }
    setStore(newStore);
    actuallySetStore(newStore);
    handleClose();
  };

  return (
    <>
      <StyledButton variant='outlined' size='small' aria-label='Edit Thumbnail' onClick={handleOpen}>
        <ButtonText>Change Background</ButtonText>
      </StyledButton>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <StyledBox>
          <h2>Change presentation background</h2>
          <FlexedDiv>
            <FlexedDiv>
              <label htmlFor='revert'>Revert to default</label>
              <input type='radio' name='changeBackground' id='revert' checked={!changeBackground} onChange={() => setChangeBackground(!changeBackground)}></input>
            </FlexedDiv> 
            <FlexedDiv>
              <label htmlFor='changeBackground'>Change slide background</label>
              <input type='radio' name='changeBackground' id='changeBackground' checked={changeBackground} onChange={() => setChangeBackground(!changeBackground)}></input>
            </FlexedDiv>
          </FlexedDiv>
          { changeBackground && (
            <>
              <FlexedDiv>
                <FlexedDiv>
                  <label htmlFor='setForSlide'>Set for current slide</label>
                  <input type='radio' name='defaultCurrOptions' id='setForSlide' checked={!defaultCurr} onChange={() => setDefaultCurr(!defaultCurr)}></input>
                </FlexedDiv>
                <FlexedDiv>
                  <label htmlFor='setDefaultCurr'>Set default</label>
                  <input type='radio' name='defaultCurrOptions' id='setDefaultCurr' checked={defaultCurr} onChange={() => setDefaultCurr(!defaultCurr)}></input>
                </FlexedDiv> 
              </FlexedDiv>
              <FlexedDiv>
                <FlexedDiv>
                  <label htmlFor='color'>Solid Colour</label>
                  <input type='radio' name='backgroundOptions' value={colorKey} id='color' checked={backgroundType === colorKey} onChange={() => setBackgroundType(colorKey)}></input>
                </FlexedDiv>
                <FlexedDiv>
                  <label htmlFor='image'>Image</label>
                  <input type='radio' name='backgroundOptions' value={imageKey} id='image' checked={backgroundType === imageKey} onChange={() => setBackgroundType(imageKey)}></input>
                </FlexedDiv>
                <FlexedDiv>
                  <label htmlFor='gradient'>Gradient</label>
                  <input type='radio' name='backgroundOptions' value={gradientKey} id='gradient' checked={backgroundType === gradientKey} onChange={() => setBackgroundType(gradientKey)}></input>
                </FlexedDiv> 
              </FlexedDiv>
              { backgroundType === colorKey && (
                <>
                  <label htmlFor='backgroundColor'>Choose Colour</label>
                  <FlexedDiv>
                    <input type="color" id="backgroundColor" name="backgroundColor" value={`${backgroundColour}`} onChange={e => setBackgroundColour(e.target.value) }/>
                    <div style={{ backgroundColor: backgroundColour, width: '100px', height: '20px', border: '2px solid #000000'}}/>
                  </FlexedDiv>
                </>
              )}
              { backgroundType === imageKey && (
                <>
                  <FlexedDiv>
                    <FlexedDiv>
                      <label htmlFor='uploadFile'>Upload image</label>
                      <input type='radio' name='imageOptions' id='uploadFile' checked={uploadFile} onChange={() => setUploadFile(!uploadFile)}></input>
                    </FlexedDiv>
                    <FlexedDiv>
                      <label htmlFor='linkImage'>Link image</label>
                      <input type='radio' name='imageOptions' id='linkImage' checked={!uploadFile} onChange={() => setUploadFile(!uploadFile)}></input>
                    </FlexedDiv>
                  </FlexedDiv>
                  { uploadFile ? (
                    <input type='file' id='imageFile' onChange={handleFile}></input>
                  ) : (
                    <input type='url' id='imageLink' onChange={handleURL}></input>
                  )}
                </>
              )}
              { backgroundType === gradientKey && (
                <>
                  <label htmlFor='backgroundGradient'>Choose gradient</label>
                  <FlexedDiv>
                    <input type="color" id="backgroundGradient" name="backgroundGradient" value={`${backgroundGradient}`} onChange={e => setBackgroundGradient(e.target.value) }/>
                    <div style={{ background: `linear-gradient(to right, ${backgroundGradient}, #FFFFFF)`, width: '100px', height: '20px', border: '2px solid #000000'}}/>
                  </FlexedDiv>
                </>
              )}
            </>
          )}
          <button onClick={editBackground}>Confirm</button>
        </StyledBox>
      </Modal>
    </>
  )
}

export default ChangeBackgroundModal