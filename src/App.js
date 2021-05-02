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
  const countRef = useRef(null);
  const chartRef = useRef(null);
  const [bpm, setBpm] = useState(0);
  const [instantBpm, setInstantBpm] = useState(0);
  const [data, setData] = useState({
    x: [],
    y: []
  });
  const [unstable, setUnstable] = useState(0);
  const [diffs, setDiffs] = useState([]);
  const [currDiff, setCurrDiff] = useState(null);



  useEffect(() => {
    if(!running) return
    if(key1) {
      setCounterL(counterL+1);
      //console.log(timer)
      measureBPM();
      UR();
    }
    

  }, [key1])

  useEffect(() => {
    if(!running) return
    if(key2) {
      setCounterR(counterR+1);
      //console.log(timer)
      measureBPM();
      UR();
    }
    

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
    chartRef.current.reset()
    setDiffs([])
    setCounterL(0)
    setCounterR(0)
    setTimer(TESTTIME)
    setBpm(0)
    setDiffs([])
    setCurrDiff(null)
    setUnstable(0)
  }

  const handleStart = () => {

    if(running) return
    //chartRef.current.reset()
    //handleReset();
    setRunning(true);
    let start = Date.now()
    
    countRef.current = setInterval(() => {
      let delta = Date.now() - start;
      setTimer(delta)
      
      
    }, 10)
    setCurrDiff(TESTTIME - timer)
    
  }

  const handleStop = () => {
    clearInterval(countRef.current)
    setRunning(false)
  }

  const insertData = (time, bpm, instantBpm) => {
    chartRef.current.update(time, bpm, instantBpm, counterL+counterR)
    // setData(data => {
    //   return {
    //     x: [...data.x, time],
    //     y: [...data.y, bpm]
    //   }
    // });
    
    if(currDiff == null) {
      setCurrDiff(time)
    }
    else {
      setDiffs(diffs => [...diffs, time - currDiff])
      setCurrDiff(time)
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
      
      if(diffs.length >= 6 && diffs[diffs.length-1] !== 0){
        let res = 0
        for (let i=0; i<6; i++) {
          res += diffs[diffs.length-1-i]
        }
        setInstantBpm(Math.round(60 / 4 / res * 6 * 100)/100);
      }
      else if(diffs.length >= 2 && diffs[diffs.length-1] !== 0) {
        let res = 0
        for (let i=0; i<diffs.length; i++) {
          res += diffs[diffs.length-1-i]
        }
        setInstantBpm(Math.round(60 / 4 / res * diffs.length * 100)/100);
      }
      
      setBpm(bpm)
      insertData(runningTime/1000, bpm, instantBpm)
    }
    
  }

  const UR = () => {
    let newDiff = diffs.slice(1);
    if(newDiff.length<2) return null
    let sum = newDiff.reduce(function(a, b){return a + b});
		let avg = sum / newDiff.length;
    let deviations = []

    newDiff.map(function(v) {
				deviations.push((v - avg) * (v - avg));
			});
		let variance = deviations.reduce(function(a, b) {return a + b;});
		let std = Math.sqrt(variance / deviations.length);
    // console.log(deviations)
    // console.log(newDiff)
		setUnstable(std * 10000);

  }



  
  
  return (
    <div className="App">
      <p>{counterL+counterR} / {((TESTTIME - timer)/1000).toFixed(2)} seconds</p>
      <BPMDisplay bpm={bpm}/>
      <p>{formatTime()}</p>
      <p>{unstable.toFixed(2)} UR</p>
      <p>{instantBpm.toFixed(2)} BPM</p>
      <Clicker
        key1={key1}
        key2={key2}
      />
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleReset}>Reset</button>
      <div style={{
        margin: "auto",
        width: "50%"
      }}>
        <Graph
          ref={chartRef}
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
