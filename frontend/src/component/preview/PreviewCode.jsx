import React from 'react';
import styled from 'styled-components';
import detectLang from 'lang-detector';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const StyledCode = styled(SyntaxHighlighter)`
    height: 100%;
    width: 100%;
    margin: 0;
    overflow: auto;
    box-sizing: border-box;
`

const PreviewCode = ({ code, height, width, fontSize, top, left }) => {
  const [lang, setLang] = React.useState(detectLang(code));
  React.useEffect(() => {
    setLang(detectLang(code));
  }, [code])

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
      <StyledCode language={lang.toLowerCase()} style={docco} customStyle={{ fontSize: `${fontSize}em`}}>
        {code}
      </StyledCode>
    </div>
  );
}

export default PreviewCode