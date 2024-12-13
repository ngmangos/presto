import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const CardStyle = styled.div`
  width: clamp(350px, 70%, 380px);
  height: calc(0.5 * clamp(350px, 100%, 380px));
  margin-bottom: 10px;
  margin-right: 10px;
  padding: 10px;
  box-sizing: border-box;
  border: 2px solid #dbe0e3;
  cursor: pointer;
  overflow: hidden;
`
const Card = ({ id, title, thumbnail, desc }) => {
  const navigate = useNavigate();

  const goToSlides = () => {
    navigate(`/presentation/${id}/1`);
  }

  return <>
    <CardStyle onClick={goToSlides} style={{ backgroundColor: thumbnail }} className="mdc-card mdc-card__primary-action">
      <h3>{title}</h3>
      {desc}
      <div className="mdc-card__ripple"></div>
    </CardStyle>
  </>;
}

export default Card;