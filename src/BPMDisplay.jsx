function BPMDisplay({bpm}) {
    return (
        <div>
           <h1 id="bpm">{bpm.toFixed(2)} bpm</h1>
        </div>
    )
}

export default BPMDisplay