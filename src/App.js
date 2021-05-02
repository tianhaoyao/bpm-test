import './App.css';
import { useState, useEffect, useRef } from "react";

import Graph from './Graph';
import Clicker from './Clicker';
import BPMDisplay from './BPMDisplay';

function App() {

  const TESTTIME = 10000
  const [counterL, setCounterL] = useState(0)
  const [counterR, setCounterR] = useState(0)
  const [timer, setTimer] = useState(TESTTIME)
  const [running, setRunning] = useState(false)
  const key1 = useKeyPress("z");
  const key2 = useKeyPress("x");
  const countRef = useRef(null)
  const [bpm, setBpm] = useState(0);
  const [data, setData] = useState([]);
  const [unstable, setUnstable] = useState(0);
  const [diffs, setDiffs] = useState([]);


  useEffect(() => {
    if(!running) return
    if(key1) {
      setCounterL(counterL+1);
      //console.log(timer)
    }
    measureBPM();

  }, [key1])

  useEffect(() => {
    if(!running) return
    if(key2) {
      setCounterR(counterR+1);
      //console.log(timer)
    }
    measureBPM();

  }, [key2])

  // useEffect(() => {
  // },[bpm])

  useEffect(() => {
    if(running) {
      if(timer>=TESTTIME) {
        handleStop();
      }
    }
  }, [timer])

  const handleReset = () => {
    handleStop();
    setTimer(0);
    setCounterL(0);
    setCounterR(0);
  }

  const handleStart = () => {
    if(running) return
    handleReset();
    setRunning(true);
    let start = Date.now()
    countRef.current = setInterval(() => {
      let delta = Date.now() - start;
      setTimer(delta)
    }, 10)
  }

  const handleStop = () => {
    clearInterval(countRef.current)
    setRunning(false)
  }

  const insertData = (time, bpm) => {
    setData(data => [...data, {
      x: time, 
      y: bpm
    }]);
    //console.log(data[data.length-1])
    if(data.length >= 1){
      setDiffs(diffs => [...diffs, time - data[data.length-1].x])
      //console.log(diffs)
    }
    
  }
  

  const formatTime = () => {

    let seconds = (timer/1000).toFixed(2);
    
    return `${seconds}`
  }

  const measureBPM = () => {
    const runningTime = timer
    if(runningTime !== 0) {
      const ratio = 60000 / runningTime
      const bpm = Math.round((counterL+counterR) * ratio / 4 * 100)/100
      setBpm(bpm)
      insertData(runningTime/1000, bpm)
      //console.log(data)
    }
    
  }

  const UR = () => {
    if(data === []) return null

  }


  
  
  return (
    <div className="App">
      <p>{counterL+counterR} / {((TESTTIME - timer)/1000).toFixed(2)} seconds</p>
      <BPMDisplay bpm={bpm}/>
      <p>{formatTime()}</p>
      <Clicker
        key1={key1}
        key2={key2}
      />
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <div style={{
        margin: "auto",
        width: "50%"
      }}>
        <Graph
          data={data}
        />
      </div>
    </div>
  );
}


//https://usehooks.com/useKeyPress/
function useKeyPress(targetKey) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);
  // If pressed key is our target key then set to true
  function downHandler({ key }) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }
  // If released key is our target key then set to false
  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };
  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount
  return keyPressed;
}

export default App;
