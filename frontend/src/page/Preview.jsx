import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Slide from '../component/Slide';
import NavButtons from '../component/NavButtons';
import ControlButtons from '../component/ControlButtons';

const PreviewStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
`;

/* styles for transition
 * new slide fades in (enter)
 * old slide fades out (exit)
 */
const fadeInOutStyles = css`
  .fadeInOut-enter {
    opacity: 0;
  }
  &.fadeInOut-enter-active {
    opacity: 1;
    transition: opacity 500ms;
  }
  &.fadeInOut-exit {
    opacity: 1;
  }
  &.fadeInOut-exit-active {
    opacity: 0;
    transition: opacity 500ms;
  }
`;

/* positioning stops slide moving when the size changes when moving between slides
 * overflow stops scroll bars appearing when this occurs
 */
const FadeInOutSlide = styled.div`
  ${fadeInOutStyles};
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
`

const Preview = ({ store, setStore, actuallySetStore }) => {
  const params = useParams();
  const [curSlideNum, setCurSlideNum] = useState(Number(params.num));

  if (!store || !store.decks) {
    return <>Loading....</>
  }
  const curDeck = store.decks.find(deck => deck.id === Number(params.id));

  return (
    <PreviewStyle>
      <TransitionGroup>
        <CSSTransition
          key={curSlideNum}
          timeout={500}
          classNames="fadeInOut"
        >
          <FadeInOutSlide>
            <Slide
              id={params.id}
              content={curDeck.slides[curSlideNum - 1].content}
              number={curDeck.slides[curSlideNum - 1].slideNum}
              store={store}
              setStore={setStore}
              actuallySetStore={actuallySetStore}
              displayType={'preview'}
            />
          </FadeInOutSlide>
        </CSSTransition>
      </TransitionGroup>

      <ControlButtons type='preview'>
        <NavButtons
          type={'preview'}
          deckId={params.id}
          slideNum={curSlideNum}
          setSlideNum={setCurSlideNum}
          deckLength={curDeck.slides.length}
          store={store}
          actuallySetStore={actuallySetStore}>
        </NavButtons>
      </ControlButtons>
    </PreviewStyle>
  );
}

export default Preview;