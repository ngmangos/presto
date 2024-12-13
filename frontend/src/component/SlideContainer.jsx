import styled from 'styled-components';

const SlideContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  background-color: #F1F3F4;
  padding-left: 10px;
  padding-right: 10px;
  boz-sizing: border-box;
`

const SlideContainer = ({ children }) => {
  return <>
    <SlideContainerStyle>
      {children}
    </SlideContainerStyle>
  </>;
};

export default SlideContainer;