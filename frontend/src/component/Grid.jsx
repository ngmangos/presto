import styled from 'styled-components';
import Card from './Card';

const GridStyle = styled.div`
  width: clamp(400px, 90%, 1200px);
  height: 70vh;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-auto-rows: calc(0.5 * 350px);
  gap: 10px;
  overflow-y: auto;
  justify-items: center;
`
const Grid = ({ cards }) => {
  return <>
    <GridStyle>
      {cards.map(deck => (
        <Card key={deck.id} id={deck.id} title={deck.title} thumbnail={deck.thumbnail} desc={deck.desc} />
      ))}
    </GridStyle>
  </>;
}

export default Grid;