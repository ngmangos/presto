import styled from 'styled-components';
import Slide from './Slide'

const GridStyle = styled.div`
  width: clamp(400px, 90%, 1200px);
  height: 70vh;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: calc(0.5 * 250px);
  gap: 10px;
  overflow-y: auto;
  justify-items: center;
`
const SlideGrid = ({ slides, store, setStore, actuallySetStore }) => {
  return <>
    <GridStyle>
      {slides.map(slide => (
        <Slide
          key={slide.id} // Ensure each child has a unique key
          number={slide.slideNum}
          content={slide.content}
          store={store}
          setStore={setStore}
          actuallySetStore={actuallySetStore}
          displayType='rearrange'
        />
      ))}
    </GridStyle>
  </>;
}

export default SlideGrid;