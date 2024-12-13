import Box from '@mui/material/Box';
import React from 'react';
import styled from 'styled-components';

const boxStyle = {
  position: 'absolute',
  top: '25%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'clamp(250px, 60%, 300px)',
  height: 'clamp(250px, 60%, 500px)',
  bgcolor: '#BFBEF5',
  border: '4px solid #7D8BE0',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
  borderRadius: '30px',
};

const ModalBox = styled(Box)`
  margin-top: 20vh;
  border-radius: 30px;

  text-align: center;
  justify-content: space-around;
  align-items: center;

  font-size: 20px;

  button {
    padding: 8px;
    border-radius: 10px;
    background-color: white;
    color: black;
    border: 2px solid grey,
  }
`

const StyledBox = React.forwardRef(( { children }, ref) => (
  <ModalBox ref={ref} sx={boxStyle} tabIndex={-1}>
    {children}
  </ModalBox>
));

StyledBox.displayName = 'StyledBox';

export default StyledBox;