import styled from 'styled-components';

const StyledImage = styled.img`
    height: 100%;
    width: 100%;
    margin: 0;
    overflow: hidden;
    box-sizing: border-box;
`

const PreviewImage = ({ image, height, width, tag, top, left }) => {

  const style = {
    height: `${height}%`,
    width: `${width}%`,
    top: `${top}%`,
    left: `${left}%`,
    position: 'absolute',
    overflow: 'hidden'
  }
  return (
    <div style={style}>
      <StyledImage src={image} alt={tag}/>
    </div>
  );
}

export default PreviewImage