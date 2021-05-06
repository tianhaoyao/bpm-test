import KeySelector from './KeySelector';
function Options({set1, set2, adjust, adjust2, setAdjust, setAdjust2}) {


    return (
        <div className="keySelector">
            <KeySelector
                set={set1}
                adjust={adjust}
                setAdjust={() => setAdjust(true)}
                k="Key 1"
            />
            <KeySelector
                set={set2}
                adjust={adjust2}
                setAdjust={() => setAdjust2(true)}
                k="Key 2"
            />
        </div>
    )
}

export default Options;