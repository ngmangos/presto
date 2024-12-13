import SlideNumber from './SlideNumber';
import Code from './slideElement/Code';
import Text from './slideElement/Text';
import Image from './slideElement/Image';
import Video from './slideElement/Video';
import React from 'react';
import PreviewCode from './preview/PreviewCode'
import PreviewImage from './preview/PreviewImage'
import PreviewVideo from './preview/PreviewVideo'
import PreviewText from './preview/PreviewText'
import styled from 'styled-components';

const EditSlideStyle = styled.div`
  width: 70vw;
  height: 39.375vw;
  position: relative;
  border: 2px solid #dbe0e3;
  box-sizing: border-box;
`

const PreviewSlideStyle = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 0px;
  box-sizing: border-box;
`

const RearrangeSlideStyle = styled.div`
  width: 200px;
  height: 112px;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  border: 2px solid #dbe0e3;
  border: 2px solid black;
  cursor: pointer;
`

const Slide = ({ store, setStore, actuallySetStore, number, displayType }) => {
  const [deletedElementId, setDeletedElementId] = React.useState(null);

  const deleteElement = (elementIndex) => {
    const newStore = JSON.parse(JSON.stringify(store));
    const deckId = location.pathname.split('/')[2];
    const curDeck = newStore.decks?.find(deck => deck.id === Number(deckId));
    const curSlide = curDeck.slides?.find(slide => slide.slideNum === Number(number));

    if (curSlide) {
      const elementToDelete = curSlide.elements[elementIndex];
      setDeletedElementId(elementToDelete.id)
      // Filter out the element by index
      curSlide.elements = curSlide.elements.filter((_, index) => index !== elementIndex);

      // Update both store and actuallySetStore to ensure re-render
      actuallySetStore(newStore);
      setStore(newStore);
    }
  };

  const handleElements = (element, elementIndex) => {
    if (element.type === 'code') {
      if (displayType !== 'edit') {
        return (
          <PreviewCode
            store={store}
            code={element.code}
            fontSize={element.fontSize}
            height={element.height}
            width={element.width}
            top={element.top}
            left={element.left}/>
        )
      }
      return (
        <Code
          store={store}
          setStore={setStore}
          actuallySetStore={actuallySetStore}
          code={element.code}
          fontSize={element.fontSize}
          height={element.height}
          width={element.width}
          top={element.top}
          left={element.left}
          elementIndex={elementIndex}
          deleteElement={deleteElement}
          curSlideNum={number}>
        </Code>
      );
    } else if (element.type === 'text') {
      if (displayType !== 'edit') {
        return (
          <PreviewText
            store={store}
            text={element.text}
            color={element.color}
            fontSize={element.fontSize}
            height={element.height}
            width={element.width}
            top={element.top}
            left={element.left}
            font={getFont()}/>
        )
      }
      return (
        <Text
          store={store}
          setStore={setStore}
          actuallySetStore={actuallySetStore}
          text={element.text}
          color={element.color}
          fontSize={element.fontSize}
          height={element.height}
          width={element.width}
          top={element.top}
          left={element.left}
          elementIndex={elementIndex}
          curSlideNum={number}
          deleteElement={deleteElement}
          font={getFont()}>
        </Text>
      );
    } else if (element.type === 'image') {
      if (displayType !== 'edit') {
        return (
          <PreviewImage
            store={store}
            image={element.image}
            tag={element.tag}
            height={element.height}
            width={element.width}
            top={element.top}
            left={element.left}/>
        )
      }
      return (
        <Image
          store={store}
          setStore={setStore}
          actuallySetStore={actuallySetStore}
          image={element.image}
          tag={element.tag}
          height={element.height}
          width={element.width}
          top={element.top}
          left={element.left}
          elementIndex={elementIndex}
          deleteElement={deleteElement}
          curSlideNum={number}>
        </Image>
      );
    } else if (element.type === 'video') {
      if (displayType !== 'edit') {
        return (
          <PreviewVideo
            store={store}
            video={element.video}
            autoplay={element.autoplay}
            height={element.height}
            width={element.width}
            top={element.top}
            left={element.left}/>
        )
      }
      return (
        <Video
          store={store}
          setStore={setStore}
          actuallySetStore={actuallySetStore}
          video={element.video}
          autoplay={element.autoplay}
          height={element.height}
          width={element.width}
          top={element.top}
          left={element.left}
          elementIndex={elementIndex}
          deleteElement={deleteElement}
          curSlideNum={number}>
        </Video>
      );
    }
  }

  const getElements = () => {
    const deckId = location.pathname.split('/')[2];
    const curDeck = store.decks?.find(deck => deck.id === Number(deckId));
    const curSlide = curDeck.slides?.find(slide => slide.slideNum === Number(number));
    return curSlide?.elements || [];
  };

  const getFont = () => {
    const deckId = location.pathname.split('/')[2];
    const curDeck = store.decks?.find(deck => deck.id === Number(deckId));
    const curSlide = curDeck.slides?.find(slide => slide.slideNum === Number(number));
    return curSlide.font;
  }

  const backgroundToStyle = (backgroundInput) => {
    if (backgroundInput.type === 'image') {
      return { backgroundImage: `url(${backgroundInput.background})`, backgroundSize: '100% 100%' }
    } else if (backgroundInput.type === 'gradient') {
      return { background: `linear-gradient(to right, ${backgroundInput.background}, #FFFFFF)` }
    }
    return { backgroundColor: backgroundInput.background }
  }

  const getBackground = () => {
    const deckId = location.pathname.split('/')[2];
    const curDeck = store.decks?.find(deck => deck.id === Number(deckId));
    const curSlide = curDeck.slides?.find(slide => slide.slideNum === Number(number));
    if (curSlide.background.type === 'default') {
      return backgroundToStyle(curDeck.background);
    }
    return backgroundToStyle(curSlide.background);
  }

  const displayTypeToStyle = (displayTypeInput) => {
    if (displayTypeInput === 'edit' || displayTypeInput === 'version') return EditSlideStyle;
    if (displayTypeInput === 'rearrange') return RearrangeSlideStyle;
    return PreviewSlideStyle;
  }

  const SlideStyle = displayTypeToStyle(displayType);
  return (
    <SlideStyle style={getBackground()}>
      {getElements().map((element, index) => (
        <div key={`${element.id}-${deletedElementId}`}> {/* Add deletedElementId to force re-render */}
          {handleElements(element, index, deleteElement)} {/* Pass deleteElement if needed */}
        </div>
      ))}
      <SlideNumber number={number}></SlideNumber>
    </SlideStyle>
  );
};

export default Slide;