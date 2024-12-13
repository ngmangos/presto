import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import leftIcon from '../assets/leftIcon.svg';
import rightIcon from '../assets/rightIcon.svg';
import activeLeftIcon from '../assets/activeLeftIcon.svg';
import activeRightIcon from '../assets/activeRightIcon.svg';
import addSlideIcon from  '../assets/addSlideIcon.svg';
import IconButton from '@mui/material/IconButton';
import { Tooltip } from '@mui/material';

const StyledButton = styled(IconButton)`
  height: 40px;
  width: 40px;
`
const IconImg = styled('img')`
  height: 35px;
  width: 35px;
`

const NavButtons = ({ type, deckId, slideNum, setSlideNum, deckLength, store, actuallySetStore })  => {
  const params = useParams();
  const navigate = useNavigate();

  /* move between slides */
  const prevSlide = () => {
    if (slideNum !== 1) {
      setSlideNum(Number(slideNum) - 1);
      if (type !== 'preview-versions') {
        navigate(`/${type}/${deckId}/${slideNum - 1}`);
      }
    }
  }

  const nextSlide = () => {
    if (slideNum < deckLength) {
      setSlideNum(Number(slideNum) + 1);
      if (type !== 'preview-versions') {
        navigate(`/${type}/${deckId}/${slideNum + 1}`);
      }
    }
  }

  /* create a new slide at the end of the deck */
  const newSlide = () => {
    const newStore = {...store};
    const curDeck = newStore.decks.find(deck => deck.id === Number(params.id));

    curDeck.slides.push({
      slideNum: curDeck.slides.length + 1,
      elements: [],
      font: 'calibri',
      background: { type: 'default' },
      id: Date.now()
    })

    actuallySetStore(newStore);
  }

  /* use nav buttons with arrow keys */
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'ArrowLeft') {
        prevSlide();
      } else if (event.key === 'ArrowRight') {
        nextSlide();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [slideNum, deckLength]);


  /* render nav buttons based on current slideNum */
  return (
    <>
      <Tooltip key='prev' title='Previous Slide'>
        {slideNum > 1 ? (
          <StyledButton aria-label='Previous Slide' onClick={prevSlide}>
            <IconImg src={activeLeftIcon} alt='Previous slide icon'/>
          </StyledButton>
        ) : (
          <span>
            <StyledButton aria-label='Previous Slide' onClick={prevSlide} disabled>
              <IconImg src={leftIcon} alt='Previous slide icon'/>
            </StyledButton>
          </span>
        )}
      </Tooltip>

      {type === 'presentation' && (
        <Tooltip key='new' title='New Slide'>
          <StyledButton aria-label='New Slide' onClick={newSlide}>
            <IconImg src={addSlideIcon} alt='New slide icon'/>
          </StyledButton>
        </Tooltip>
      )}

      <Tooltip key='next' title='Next Slide'>
        {slideNum !== deckLength ? (
          <StyledButton aria-label='Next Slide' onClick={nextSlide}>
            <IconImg src={activeRightIcon} alt='Next slide icon'/>
          </StyledButton>
        ) : (
          <span>
            <StyledButton aria-label='Next Slide' onClick={nextSlide} disabled>
              <IconImg src={rightIcon} alt='Next slide icon'/>
            </StyledButton>
          </span>
        )}
      </Tooltip>
    </>
  );
};

export default NavButtons;