import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import EditContainer from '../component/EditContainer';
import SlideContainer from '../component/SlideContainer';
import Slide from '../component/Slide';
import NavButtons from '../component/NavButtons';
import ControlButtons from '../component/ControlButtons'
import DeckWideControls from '../component/DeckWideControls';
import DeleteSlideModal from '../component/modals/DeleteSlideModal';
import SlideControls from '../component/SlideControls';
import styled from 'styled-components';
import { Button } from '@mui/material';

const FlexedDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  gap: 4px;
`

const CenterContent = styled.div`
  width: 100%;
  height: calc(100vh - 70px);
  display: flex;
`

const PreviewBtn = styled.p`
  position: relative;
  left: 0px;
  bottom: 0px;
  @media (max-width: 700px) {
    font-size: 10px;
  }
`

const Presentation = ({ store, setStore, actuallySetStore }) => {
  const params = useParams();
  const [curSlideNum, setCurSlideNum] = useState(params.num);


  const curDeck = store?.decks?.find(deck => deck.id === Number(params.id));

  /* manage saved versions */
  useEffect(() => {
    if (curDeck && curDeck.slides) {
      const lastSaveTime = curDeck.versions[curDeck.versions.length - 1].timeSaved;
      const secondsSinceLastSave = (Date.now() - lastSaveTime) / 1000;

      // if last save was over 60 seconds ago and user has made changes save version
      if (secondsSinceLastSave >= 60 && (curDeck.slides != curDeck.versions[curDeck.versions.length - 1])) {
        const saveVersion = {
          versionNum: curDeck.versions.length + 1,
          timeSaved: Date.now(),
          slides: curDeck.slides,
        };

        const newStore = { ...store };
        const newCurDeck = newStore.decks.find(deck => deck.id === Number(params.id));
        newCurDeck.versions.push(saveVersion);

        actuallySetStore(newStore);
      }
    }
  }, [curDeck, curDeck?.slides]);

  if (!store || !store.decks) {
    return <>Loading....</>
  }

  return (
    <>
      <CenterContent>
        <EditContainer store={store} setStore={setStore} actuallySetStore={actuallySetStore} curSlideNum={curSlideNum}></EditContainer>
        <SlideContainer>
          <FlexedDiv>
            <SlideControls
              store={store}
              setStore={setStore}
              actuallySetStore={actuallySetStore}
              curSlideNum={curSlideNum}
              font={curDeck.slides[curSlideNum - 1].font}/>
            <DeckWideControls
              deckId={params.id}
              store={store}
              actuallySetStore={actuallySetStore}/>
          </FlexedDiv>
          <Slide
            id={params.id}
            number={curDeck.slides[curSlideNum - 1].slideNum}
            store={store}
            setStore={setStore}
            actuallySetStore={actuallySetStore}
            displayType={'edit'}>
          </Slide>
          <ControlButtons>
            {curDeck.slides.length !== 1 && (
              <DeleteSlideModal
                slideNum={curSlideNum}
                setSlideNum={setCurSlideNum}
                store={store}
                actuallySetStore={actuallySetStore}>
              </DeleteSlideModal>
            )}
            <NavButtons
              type={'presentation'}
              deckId={params.id}
              slideNum={curDeck.slides[curSlideNum - 1].slideNum}
              setSlideNum={setCurSlideNum}
              deckLength={curDeck.slides.length}
              store={store}
              actuallySetStore={actuallySetStore}>
            </NavButtons>
          </ControlButtons>

          <Button
            component={Link} to={`/versions/${params.id}`} size='small'
          >
            <PreviewBtn>Version History</PreviewBtn>
          </Button>
        </SlideContainer>
      </CenterContent>
    </>
  );
};

export default Presentation;