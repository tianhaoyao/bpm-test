import React, {
  useState, useImperativeHandle, forwardRef, useEffect,
} from 'react';
import CrossfadeImage from 'react-crossfade-image';
import bpm140 from './resources/140.jpg';
import bpm160 from './resources/160.jpg';
import bpm180 from './resources/180.jpg';
import bpm200 from './resources/200.jpg';
import bpm220 from './resources/220.jpg';
import bpm240 from './resources/240.jpg';
import bpm260 from './resources/260.jpg';

const Background = forwardRef((props, ref) => {
  const transitionDuration = 2000;
  const [lastUpdate, setLastUpdate] = useState(-transitionDuration);
  const [imageUrl, setImageUrl] = useState(bpm140);
  const [prevImageUrl, setPrevImageUrl] = useState(bpm140);
  const [range, setRange] = useState(0);
  const imageList = [bpm160, bpm180, bpm200, bpm220, bpm240, bpm260];
  const style = {
    flex: 1,
    maxWidth: '100%',
    maxHeight: '100%',
    width: '100vw',
    height: '100vh',
    resizeMode: 'contain',
    filter: 'blur(20px)',
    objectFit: 'cover',
  };

  useEffect(() => {
    imageList.forEach((image) => {
      new Image().src = image;
    });
  });

  const update = (timerS, ogBpm) => {
    const timer = timerS * 1000;
    if (timer < lastUpdate + transitionDuration) {
      if (timer > lastUpdate) {
        return;
      }
    }
    setPrevImageUrl(imageUrl);
    const bpm = ogBpm * 2;
    let url = '';
    let thisrange = -1;
    switch (true) {
      case (bpm < 160):
        thisrange = 0;
        url = bpm140;
        break;
      case (bpm >= 160 && bpm < 180):
        thisrange = 1;
        url = bpm160;
        break;
      case (bpm >= 180 && bpm < 210):
        thisrange = 2;
        url = bpm180;
        break;
      case (bpm >= 200 && bpm < 220):
        thisrange = 3;
        url = bpm200;
        break;
      case (bpm >= 220 && bpm < 240):
        thisrange = 4;
        url = bpm220;
        break;
      case (bpm >= 240 && bpm < 260):
        thisrange = 5;
        url = bpm240;
        break;
      case (bpm >= 260):
        thisrange = 6;
        url = bpm260;
        break;
      default:
        thisrange = range;
        url = imageUrl;
        break;
    }
    if (thisrange === range) return;
    setImageUrl(url);
    setRange(thisrange);
    setLastUpdate(timer);
  };

  useImperativeHandle(ref, () => ({
    update,
  }));

  return (
    <div>
      <CrossfadeImage
        duration={transitionDuration}
        id="backgroundimg"
        src={imageUrl}
        style={style}
      />
      <img id="background" src={prevImageUrl} alt="background" />
    </div>
  );
});

export default Background;
