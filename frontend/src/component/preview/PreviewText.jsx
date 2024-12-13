import React from 'react';
import styled from 'styled-components';

const StyledText = styled.div`
  height: 100%;
  width: 100%;
  margin: 0;
  overflow: hidden;
  box-sizing: border-box;
`

const arialString = 'Arial, Helvetica, sans-serif';
const timesNewString = '"Times New Roman", Times, serif';
const comicSansString = '"Comic Sans MS", "Comic Sans", cursive';
const calibriString = '"Calibri", sans-serif';

const PreviewText = ({ text, color, height, width, fontSize, top, left, font }) => {

  const fontToFamilyString = (fontKey) => {
    if (fontKey === 'calibri') {
      return calibriString;
    } else if (fontKey === 'arial') {
      return arialString;
    } else if (fontKey === 'comicSans') {
      return comicSansString;
    } else if (fontKey === 'timesNew') {
      return timesNewString;
    }
  }
  const [fontFamily, setFontFamily] = React.useState(fontToFamilyString(font));

  React.useEffect(() => {
    setFontFamily(font);
  }, [font]);

  const style = {
    height: `${height}%`,
    width: `${width}%`,
    top: `${top}%`,
    left: `${left}%`,
    position: 'absolute',
    overflow: 'hidden'
  }

  return (
    <div style={style}>
      <StyledText style={{ color: color, fontSize: `${fontSize}em`, fontFamily: fontFamily }}>
        {text}
      </StyledText>
    </div>
  );
}

export default PreviewText