import { useEffect, useState } from "react";
//import SevenSegmentDisplay from "7-segment-display";


function BPMDisplay({bpm}) {


    return (
        <div>
           <p>{bpm.toFixed(2)} bpm</p>
           {/* <SevenSegmentDisplay character={bpm.toFixed(2)[0]}/> */}
        </div>
    )
}

export default BPMDisplay