import { useEffect, useState } from "react";

function BPMDisplay({bpm}) {


    return (
        <div>
           <p>{bpm.toFixed(2)} bpm</p>
        </div>
    )
}

export default BPMDisplay