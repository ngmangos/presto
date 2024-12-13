import React from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ChangeBackgroundModal from "./modals/ChangeBackgroundModal";
import styled from "styled-components";

const arialString = 'Arial, Helvetica, sans-serif';
const timesNewString = '"Times New Roman", Times, serif';
const calibriString = '"Calibri", sans-serif';

const arialKey = 'arial';
const calibriKey = 'calibri';
const timesNewKey = 'timesNew'

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

const ControlsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;

  @media (max-width: 800px) {
    flex-direction: column;
    margin-bottom: 10px;
  }
`

const SlideControls = ({ store, setStore, actuallySetStore, curSlideNum, font }) => {
  const [fontCurr, setFontCurr] = React.useState(font);
  const [fontFamily, setFontFamily] = React.useState(fontToFamily(font));

  const handleFontChange = (event) => {
    const newFont = event.target.value;

    const newStore = {...store}

    const deckId = location.pathname.split('/')[2];
    const curDeck = newStore.decks?.find(deck => deck.id === Number(deckId));
    const curSlide = curDeck.slides?.find(slide => slide.slideNum === Number(curSlideNum));
    curSlide.font = newFont;

    setFontCurr(newFont);
    setFontFamily(fontToFamily(newFont))
    setStore(newStore);
    actuallySetStore(newStore);
  }

  return (
    <ControlsContainer>
      <FormControl variant='standard' sx={{ m: 1, width: '100px', height: '50px' }}>
        <InputLabel id="input-font-label">Font</InputLabel>
        <Select
          labelId="input-font-label"
          id="input-font"
          value={fontCurr}
          label="Font Family"
          onChange={handleFontChange}
          style={{ fontFamily: fontFamily, fontSize: '0.7em' }}
        >
          <MenuItem value={arialKey} style={{ fontFamily: arialString, fontSize: '0.7em' }}>Arial</MenuItem>
          <MenuItem value={timesNewKey} style={{ fontFamily: timesNewString, fontSize: '0.7em' }}>Times New Roman</MenuItem>
          <MenuItem value={calibriKey} style={{ fontFamily: calibriString, fontSize: '0.7em' }}>Calibri</MenuItem>
        </Select>
      </FormControl>
      <ChangeBackgroundModal store={store} actuallySetStore={actuallySetStore} setStore={setStore} curSlideNum={curSlideNum}/>
    </ControlsContainer>
  );
}

export default SlideControls;