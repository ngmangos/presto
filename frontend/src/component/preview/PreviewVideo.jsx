import ReactPlayer from 'react-player'

const PreviewVideo = ({ video, height, width, autoplay, top, left }) => {

  const style = {
    height: `${height}%`,
    width: `${width}%`,
    top: `${top}%`,
    left: `${left}%`,
    position: 'absolute',
    overflow: 'hidden',
    backgroundColor: '#000000'
  }

  function handleYoutubeVideo() {
    let videoId;
    const url = video;

    const shortLinkMatch = url.match(/https:\/\/youtu\.be\/([a-zA-Z0-9_-]{11})/);
    if (shortLinkMatch) {
      videoId = shortLinkMatch[1];
    }

    const embedLinkMatch = url.match(/https:\/\/www\.youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
    if (embedLinkMatch) {
      videoId = embedLinkMatch[1];
    }

    const watchLinkMatch = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
    if (watchLinkMatch) {
      videoId = watchLinkMatch[1];
    }

    if (videoId) {
      if (autoplay) {
        return `https://www.youtube.com/watch?v=${videoId}?autoplay=1&mute=1`;
      }
      return `https://www.youtube.com/watch?v=${videoId}`;
    } else {
      return video;
    }
  }

  return (
    <div style={style}>
      <ReactPlayer playing={autoplay} url={handleYoutubeVideo()} loop={true} controls={true} width='100%' height='100%' style={{
        margin: 0,
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}/>
    </div>
  );
}

export default PreviewVideo