import { useState, useImperativeHandle, forwardRef, useEffect} from "react";
import bpm180 from './resources/180.jpg';
import bpm200 from './resources/200.jpg';
import bpm220 from './resources/220.jpg';
import bpm240 from './resources/240.jpg';

const Background = forwardRef((props, ref) => {

    const [imageUrl, setImageUrl] = useState('');
    const [range, setRange] = useState(0);

    useEffect(() => {
        let imageList = [bpm180, bpm200, bpm220, bpm240]
        imageList.forEach((image) => {
            new Image().src = image
        });
    })

    const update = (bpm) => {
        let url = '';
        let thisrange = 0;
        console.log(bpm)
        switch(true) {
            case (bpm >= 180 && bpm < 200):
                thisrange = 1;
                url = bpm180
                break;
            case (bpm >= 200 && bpm < 220):
                thisrange = 2;
                url = bpm200
                break;
            case (bpm >= 220 && bpm < 240):
                thisrange = 3;
                url = bpm220
                break;
            case (bpm >= 240):
                thisrange = 4;
                url = bpm240
                break;
            default:
                thisrange = 1;
                url = bpm180
                break;
        }
        if(thisrange === range) return
        setImageUrl(url)
        setRange(thisrange)
    }

    useImperativeHandle(ref, () => {
        return {
            update: update
        }
    })

    return (
        <div style={{
            backgroundImage: imageUrl
        }}>
          <img id="backgroundimg" src={imageUrl}></img>
        </div>
    )
})

export default Background