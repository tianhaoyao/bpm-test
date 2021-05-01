import './App.css';
import { useState, useEffect, useRef } from "react";
import {XYPlot, XAxis, YAxis, HorizontalGridLines,LineSeries, AreaSeries} from 'react-vis';

function App() {

  const TESTTIME = 100
  const [counterL, setCounterL] = useState(0)
  const [counterR, setCounterR] = useState(0)
  const [timer, setTimer] = useState(TESTTIME)
  const [running, setRunning] = useState(false)
  const key1 = useKeyPress("z");
  const key2 = useKeyPress("x");
  const countRef = useRef(null)
  const [bpm, setBpm] = useState(0);
  const [data, setData] = useState([]);


  useEffect(() => {
    if(!running) return
    if(key1) {
      setCounterL(counterL+1);
      console.log(timer)
    }
    measureBPM();

  }, [key1])

  useEffect(() => {
    if(!running) return
    if(key2) {
      setCounterR(counterR+1);
      console.log(timer)
    }
    measureBPM();

  }, [key2])



  useEffect(() => {
    if(running) {
      if(timer<=0) {
        handleStop();
      }
    }
  }, [timer])

  const handleReset = () => {
    handleStop();
    setTimer(TESTTIME);
    setCounterL(0);
    setCounterR(0);
  }

  const handleStart = () => {
    if(running) return
    handleReset();
    setRunning(true);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer - 1)
    }, 100)
  }

  const handleStop = () => {
    clearInterval(countRef.current)
    setRunning(false)
  }

  const insertData = (time, bpm) => {
    let newData = data;
    newData.push({
      x: time, 
      y: bpm
    })
    setData(newData);
  }
  

  const formatTime = () => {
    const getMiliS = `${(timer % 10)}`.slice(-2)
    const getSeconds = `${Math.floor(timer / 10)}`
    

    return `${getSeconds} : ${getMiliS}`
  }

  const measureBPM = () => {
    const runningTime = TESTTIME - timer
    if(runningTime !== 0) {
      const ratio = 600/runningTime
      const bpm = Math.round((counterL+counterR) * ratio / 4 * 100)/100
      console.log((counterL+counterR), ratio)
      console.log(bpm)
      setBpm(bpm)
      insertData(runningTime/10, bpm)
      //console.log(data)
    }
    
  }

  
  
  return (
    <div className="App">
      <p>{counterL+counterR} / {(TESTTIME - timer)/10} seconds</p>
      <p>{bpm}</p>
      <p>{formatTime()}</p>
      {key1 ? "😊" : "⚫"}
      {key2 ? "😢" : "⚫"}
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <div style={{
        margin: "auto",
        width: "50%"
      }}>
        <XYPlot
          width={600}
          height={300}
          animation={true}
          // xDomain={[0, 10]}
          >
          <HorizontalGridLines />
          <AreaSeries
            color="red"
            curve={'curveMonotoneX'}
            data={data}/>
          <XAxis title="X" />
          <YAxis />
        </XYPlot>
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
