import styled from 'styled-components';

import AddCode from './modals/AddCode';
import AddText from './modals/AddText';
import AddImage from './modals/AddImage';
import AddVideo from './modals/AddVideo';

const EditStyle = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #dbe0e3;
  width: 100px;
  align-items: center;
  justify-content: flex-start;
  padding: 5px;
  padding-top: 80px;
  box-sizing: border-box;
  gap: 50px;
`

const EditContainer = ({ store, actuallySetStore, setStore, curSlideNum }) => {
  return (
    <EditStyle>
      <AddText store={store} actuallySetStore={actuallySetStore} setStore={setStore} curSlideNum={curSlideNum}></AddText>
      <AddImage store={store} actuallySetStore={actuallySetStore} setStore={setStore} curSlideNum={curSlideNum}></AddImage>
      <AddVideo store={store} actuallySetStore={actuallySetStore} setStore={setStore} curSlideNum={curSlideNum}></AddVideo>
      <AddCode store={store} actuallySetStore={actuallySetStore} setStore={setStore} curSlideNum={curSlideNum}></AddCode>
    </EditStyle>
  );
};

export default EditContainer;