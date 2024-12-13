import styled from 'styled-components';

const SlideNumberStyle = styled.div`
  width: 50px;
  height: 50px;
  position: absolute;
  left: 0;
  bottom: 0;
  font-size: 1em;
  text-align: center;
  padding: 10px;
  box-sizing: border-box;
`

const SlideNumber = ({ number }) => {
  return <>
    <SlideNumberStyle>{number}</SlideNumberStyle>
  </>;
};

export default SlideNumber;