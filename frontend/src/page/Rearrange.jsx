import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import SlideGrid from '../component/SlideGrid';
import { Link } from 'react-router-dom';

const Rearrange = ({ store, setStore, actuallySetStore }) => {
  const params = useParams();

  if (!store || !store.decks) {
    return <>Loading....</>;
  }

  const curDeck = store.decks.find(deck => deck.id === Number(params.id));

  const onConfirm = () => {}

  return (
    <>
      <Button sx={{ margin: 3 }} size='small' variant='outlined' onClick={onConfirm}>Confirm</Button>
      <Button size='small' component={Link} variant='outlined' to={`/presentation/${curDeck.id}/1`}>Close</Button>
      <SlideGrid slides={curDeck.slides} store={store} actuallySetStore={actuallySetStore} setStore={setStore}></SlideGrid>
    </>
  );
};

export default Rearrange;