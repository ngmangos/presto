import styled from 'styled-components';

const ControlButtonsStyle = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
  width: 97%;

  ${({ type }) => type === 'preview' ? `
    position: absolute;
    right: 0px;
    bottom: 5px;
  ` : ''}
`
const ControlButtons = ({type, children}) => {
  return <>
    <ControlButtonsStyle type={type}>
      {children}
    </ControlButtonsStyle>
  </>;
};

export default ControlButtons;