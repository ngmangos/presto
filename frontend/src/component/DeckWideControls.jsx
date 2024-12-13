import styled from 'styled-components';
import { Link } from 'react-router-dom';
import DeletePresModal from './modals/DeletePresModal';
import { Button } from '@mui/material';

const DeckWideControlStyle = styled.div`
  display: flex;
  justify-content: flex-end;

  @media (max-width: 800px) {
    flex-direction: column;
    margin-bottom: 0px;
  }
`;

const ButtonText = styled.span`
  style: inline;
  margin-right: 10px;
  font-size: 15px;
  text-align: center;

  @media (max-width: 800px) {
    font-size: 10px;
  }
`;

const DeckWideControls = ({ deckId, store, actuallySetStore }) => {
  const previewLink = `http://localhost:3000/preview/${deckId}/1`;

  return (
    <DeckWideControlStyle>
      <Button
        href={previewLink}
        target='_blank'
        rel="noreferrer"
        size='small'
      >
        <ButtonText>Preview</ButtonText>
      </Button>
      <Button size='small' component={Link} to={`/rearrange/${deckId}`}>
        <ButtonText>Rearrange Slides</ButtonText>
      </Button>
      <DeletePresModal store={store} actuallySetStore={actuallySetStore}></DeletePresModal>
    </DeckWideControlStyle>
  );
};

export default DeckWideControls;