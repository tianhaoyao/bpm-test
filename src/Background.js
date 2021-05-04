import { useState, useImperativeHandle, forwardRef, useEffect} from "react";
import bpm140 from './resources/140.jpg';
import bpm160 from './resources/160.jpg';
import bpm180 from './resources/180.jpg';
import bpm200 from './resources/200.jpg';
import bpm220 from './resources/220.jpg';
import bpm240 from './resources/240.jpg';
import bpm260 from './resources/260.jpg';
import CrossfadeImage from 'react-crossfade-image'

const Background = forwardRef((props, ref) => {

    const [imageUrl, setImageUrl] = useState(bpm180);
    const [range, setRange] = useState(0);
    const style = {
        width: '100%',
        height: '100%',
        filter: "blur(20px)",
    }

    useEffect(() => {
        let imageList = [bpm160, bpm180, bpm200, bpm220, bpm240, bpm260]
        imageList.forEach((image) => {
            new Image().src = image
        });
    })

    const update = (bpm) => {
        let url = '';
        let thisrange = -1;
        console.log(bpm)
        switch(true) {
            case (bpm < 160):
                thisrange = 0;
                url = bpm140
                break;
            case (bpm >= 160 && bpm < 180):
                thisrange = 1;
                url = bpm160
                break;
            case (bpm >= 180 && bpm < 200):
                thisrange = 2;
                url = bpm180
                break;
            case (bpm >= 200 && bpm < 220):
                thisrange = 3;
                url = bpm200
                break;
            case (bpm >= 220 && bpm < 240):
                thisrange = 4;
                url = bpm220
                break;
            case (bpm >= 240&& bpm < 260):
                thisrange = 5;
                url = bpm240
                break;
            case (bpm >= 260):
                thisrange = 6;
                url = bpm260
                break;
            default:
                thisrange = -1;
                url = bpm140
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
        <div>
           
            <CrossfadeImage 
                id="backgroundimg" 
                src={imageUrl}
                style={style}
               />
            
          
          {/* <img id="backgroundimg" src={imageUrl}></img> */}
        </div>
    )
})

export default Background