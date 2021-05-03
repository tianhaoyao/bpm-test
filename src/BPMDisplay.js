import { useEffect, useState } from "react";
//import SevenSegmentDisplay from "7-segment-display";


function BPMDisplay({bpm}) {


    return (
        <div>
           <h1>{bpm.toFixed(2)} bpm</h1>
           {/* <SevenSegmentDisplay character={bpm.toFixed(2)[0]}/> */}
        </div>
    )
}

export default BPMDisplay