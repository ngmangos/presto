import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import styled from 'styled-components';

const SlideArea = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    pointer-events: none;
    padding: 0;
`

const CornerBox = styled.div`
  position: absolute;
  width: 5px;
  height: 5px;
  box-sizing: border-box;
  background-color: #000000;
`

const SlideElement = ({ store, setStore, actuallySetStore, height, width, top, left, children, elementIndex, curSlideNum, openModal, openMenu }) => {
  const [editMode, setEditMode] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0})
  const [isPositionSet, setIsPositionSet] = React.useState(false);
  const slideAreaRef = useRef(null);
  const nodeRef = React.useRef(null);

  const calculatePosition = () => {
    if (slideAreaRef.current) { 
      const slideAreaRect = slideAreaRef.current.getBoundingClientRect();
      const x = (left / 100) * slideAreaRect.width;
      const y = (top / 100) * slideAreaRect.height;
      setPosition({ x, y });
      setIsPositionSet(true);
    }
  };

  React.useEffect(() => {
    calculatePosition();
    window.addEventListener('resize', calculatePosition); 
    return () => window.removeEventListener('resize', calculatePosition); 
  }, [top,left]);

  const childStyle = {
    height: `${height}%`,
    width: `${width}%`,
    margin: '0',
    padding: '0',
    boxSizing: 'border-box',
    overflow: 'none',
    position: 'relative',
    pointerEvents: 'auto',
    border: editMode ? '2px solid #dbe0e3': 'none'
  }

  const eventLogger = (e, data) => {
    const newStore = {...store}
    if (slideAreaRef.current) {
      const slideAreaRect = slideAreaRef.current.getBoundingClientRect();
      const newLeft = (data.x / slideAreaRect.width) * 100;
      const newTop = (data.y / slideAreaRect.height) * 100;
      setPosition({ x: data.x, y: data.y });
      const deckId = location.pathname.split('/')[2];
      const curDeck = newStore.decks?.find(deck => deck.id === Number(deckId));
      const curSlide = curDeck.slides?.find(slide => slide.slideNum === Number(curSlideNum));
      const curElement = curSlide.elements[elementIndex];
      curElement.top = newTop;
      curElement.left = newLeft;
    }
    setStore(newStore);
    actuallySetStore(newStore);
  }

  return (
    <SlideArea ref={slideAreaRef}>
      { isPositionSet && (
        <Draggable
          nodeRef={nodeRef}
          axis='both'
          disabled={!editMode}
          onStop={eventLogger}
          defaultPosition={{ x: position.x, y: position.y }}
          bounds='parent'>
          <div 
            style={childStyle} 
            onClick={() => setEditMode(!editMode)}
            onDoubleClick={openModal}
            onContextMenu={openMenu}
            ref={nodeRef}
          >
            { editMode && (
              <>
                <CornerBox style={{ top: '0%', left: '0%'}}/>
                <CornerBox style={{ top: '0%', right: '0%'}}/>
                <CornerBox style={{ bottom: '0%', left: '0%'}}/>
                <CornerBox style={{ bottom: '0%', right: '0%'}}/>
              </>
            )}
            {children}
          </div>
        </Draggable>
      )}
    </SlideArea>
  );
}

export default SlideElement