import '../StyleSetup.scss';
import Grid from '../component/Grid';
import NewPresModal from '../component/modals/NewPresModal'
import styled from 'styled-components';

const NewPresContainer = styled.div`
  background-color: #F1F3F4;
  padding-top: clamp(5px, 1%, 30px);
  padding-bottom: clamp(10px, 2%, 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
`

const PresContainer = styled.div`
  padding-top: clamp(10px, 2%, 50px);
  padding-bottom: clamp(10px, 2%, 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
`

const Text = styled.p`
  margin-top: 10px;
  margin-bottom: 10px;
`


const Dashboard = ({ store, actuallySetStore }) => {
  return <>
    <NewPresContainer>
      <Text>Create a new presentation!</Text>
      <NewPresModal store={store} actuallySetStore={actuallySetStore}></NewPresModal>
    </NewPresContainer>

    <PresContainer>
      <p>Recent presentations</p>
      <Grid cards={store.decks || []}></Grid>
    </PresContainer>
  </>;
};

export default Dashboard;