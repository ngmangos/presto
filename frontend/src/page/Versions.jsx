import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Slide from '../component/Slide';
import NavButtons from '../component/NavButtons';
import ControlButtons from '../component/ControlButtons';
import { Button } from '@mui/material';

const VersionStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 70px);
  box-sizing: border-box;
  overflow: hidden;
`;

const VersionList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #dbe0e3;
  box-sizing: border-box;
  flex-grow: 1;
  height: 100%;
`;

const PresContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background-color: #F1F3F4;
  flex-grow: 4;
  height: 100%;
  padding-left: 10px;
  padding-right: 10px;
`;

const ButtonWithSpacing = styled(Button)`
  width: 80%;
  margin-bottom: 10px !important;
`;

const Versions = ({ store, setStore, actuallySetStore }) => {
  const params = useParams();
  const [curSlideNum, setCurSlideNum] = useState(1);
  const [curVersion, setCurVersion] = useState(1);

  if (!store || !store.decks) {
    return <>Loading....</>
  }

  const curDeck = store?.decks?.find(deck => deck.id === Number(params.id));
  const curVersionSlides = curDeck.versions[curVersion - 1].slides;

  /* update version num to render on side preview */
  const updateCurVersion = (num) => {
    setCurVersion(num);
    setCurSlideNum(1);
  };

  return <>
    <VersionStyle>
      <VersionList>
        <h3>Version History</h3>
        {curDeck.versions.map(version =>
          <ButtonWithSpacing
            key={version.timeSaved}
            onClick={() => updateCurVersion(version.versionNum)}
            variant='outlined'
            size='small'
            disabled
          >
            {`Version ${version.versionNum}`}
          </ButtonWithSpacing>
        )}
      </VersionList>

      <PresContainer>
        <h3>Preview Selected Version</h3>
        <Slide
          id={params.id}
          number={curVersionSlides[curSlideNum - 1].slideNum}
          store={store}
          setStore={setStore}
          actuallySetStore={actuallySetStore}
          displayType={'version'}
        />

        <ControlButtons>
          <NavButtons
            type={'preview-versions'}
            deckId={params.id}
            slideNum={curSlideNum}
            setSlideNum={setCurSlideNum}
            deckLength={curDeck.slides.length}
            store={store}
            actuallySetStore={actuallySetStore}>
          </NavButtons>
        </ControlButtons>
      </PresContainer>
    </VersionStyle>
  </>;
};

export default Versions;