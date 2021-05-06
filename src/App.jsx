import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect, useRef } from "react";

import Graph from './Graph';
import Clicker from './Clicker';
import BPMDisplay from './BPMDisplay';
import Background from './Background';
import Options from './Options';

import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar'


import { SideSheet } from 'evergreen-ui';

function App() {

  const TESTTIME = 10000
  const [counterL, setCounterL] = useState(0)
  const [counterR, setCounterR] = useState(0)
  const [timer, setTimer] = useState(0)
  const [running, setRunning] = useState(false)
  const [k1, setK1] = useState("z")
  const [k2, setK2] = useState("x")
  const [adjust, setAdjust] = useState(false);
  const [adjust2, setAdjust2] = useState(false);
  let key1 = useKeyPress("key1");
  let key2 = useKeyPress("key2");
  const countRef = useRef(null);
  const chartRef = useRef(null);
  const backgroundRef = useRef(null);
  const [bpm, setBpm] = useState(0);
  const [instantBpm, setInstantBpm] = useState(0);
  const [options, setOptions] = useState(false);
  const [unstable, setUnstable] = useState(0);
  const [diffs, setDiffs] = useState([]);
  const [currDiff, setCurrDiff] = useState(null);
  const [clickTimes, setClickTimes] = useState([]);

  //https://usehooks.com/useKeyPress/
  function useKeyPress(targetKey) {
    // State for keeping track of whether key is pressed
    const [keyPressed, setKeyPressed] = useState(false);
    // If pressed key is our target key then set to true
    const downHandler = ({ key }) => {
        if (targetKey === "key1" && key === k1) {
          //console.log(targetKey, key, k1)
          setKeyPressed(true);
        }
        if (targetKey === "key2" && key === k2) {
          setKeyPressed(true);
        }
      }
    // If released key is our target key then set to false
    const upHandler = ({ key }) => {
      if (targetKey === "key1" && key === k1) {
        setKeyPressed(false);
      }
      if (targetKey === "key2" && key === k2) {
        setKeyPressed(false);
      }
    }
    

    // Add event listeners
    useEffect(() => {
      setKeyPressed(false);
      window.addEventListener("keydown", downHandler);
      window.addEventListener("keyup", upHandler);
      // Remove event listeners on cleanup
      return () => {
        window.removeEventListener("keydown", downHandler);
        window.removeEventListener("keyup", upHandler);
      };
    }, [k1, k2]); // eslint-disable-line react-hooks/exhaustive-deps
    return keyPressed;
  }

  useEffect(() => {
    if(!running) return
    if(key1) {
      setCounterL(counterL+1);
      setClickTimes([...clickTimes, timer/1000])
      UR();
      updateOtherData();
    }
  }, [key1]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if(!running) return
    if(key2) {
      setCounterR(counterR+1);
      setClickTimes([...clickTimes, timer/1000])
      UR();
      updateOtherData();
    }
    

  }, [key2]) // eslint-disable-line react-hooks/exhaustive-deps


  useEffect(() => {
    if(running) {
      if(Math.floor(timer/10) % 10 === 0) {
        setInstantBpm(0);
        measureBPM();
        UR();
        
      }
      if(timer>=TESTTIME) {
        handleStop();
      }
    }
  }, [timer]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setAdjust(adjust)
  }, [adjust])

  const handleReset = () => {
    handleStop();
    setTimer(0);
    setCounterL(0);
    setCounterR(0);
    chartRef.current.reset()
    setDiffs([])
    setCounterL(0)
    setCounterR(0)
    setBpm(0)
    setDiffs([])
    setCurrDiff(null)
    setUnstable(0)
    setClickTimes([])
  }

  const handleStart = () => {

    handleReset();
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
    backgroundRef.current.update(bpm);
    
  }

  const updateOtherData = () => {
    let time = timer/1000
    if(currDiff == null) {
      setCurrDiff(time)
    }
    else {
      setDiffs(diffs => [...diffs, time - currDiff])
      setCurrDiff(time)
    }
  }
  
  const setKey1 = (key) => {
    console.log("k1")
    setK1(key);
    setAdjust(false);
  }

  const setKey2 = (key) => {
    console.log("k2")
    setK2(key);
    setAdjust2(false);
  }

  const measureBPM = () => {
    const runningTime = timer
    if(runningTime !== 0) {
      const ratio = 60000 / runningTime
      const bpm = Math.round((counterL+counterR) * ratio / 4 * 100)/100
      let timeElapsed = 0;
      let i = diffs.length - 1;
      let n = 0;
      const timeThreshold = 0.333;
      while(timeElapsed < timeThreshold && clickTimes[i] >= timer/1000 - timeThreshold){
        // if ()
        timeElapsed += diffs[i--];
        n++;
      }
      let res = Math.round(60 / 4 / timeElapsed * n* 100)/100
      if(isNaN(res)) {
        setInstantBpm(0);
      }
      else{
        setInstantBpm(res);
      }
      
      
      
      setBpm(bpm)
      insertData(runningTime/1000, bpm, instantBpm)
      console.log(instantBpm)
    }
    
  }

  const UR = () => {
    let newDiff = diffs.slice(1);
    if(newDiff.length<2) return null
    let sum = newDiff.reduce(function(a, b){return a + b});
		let avg = sum / newDiff.length;
    let deviations = []

    newDiff.map(v => deviations.push((v - avg) * (v - avg)));
		let variance = deviations.reduce(function(a, b) {return a + b;});
		let std = Math.sqrt(variance / deviations.length);
		setUnstable(std * 10000);

  }

  return (
    <div className="App">
      <div id="background">
        <Background ref={backgroundRef}/>
      </div>
      <div className="display">
      <ProgressBar animated variant="warning" label={`${Math.round(timer/1000)} / ${Math.round(TESTTIME/1000)}`} now={Math.round(timer/1000)} min={0} max={Math.round(TESTTIME/1000)}/>
        <div className="ui">
          

          <h3>{counterL+counterR} clicks</h3>
          <BPMDisplay bpm={bpm}/>
          <p>{unstable.toFixed(2)} UR</p>
          <Clicker
            key1={key1}
            key2={key2}
            k1={k1}
            k2={k2}
          />
          
          <Button variant="outline-light" onClick={handleStart}>Start</Button>
          <Button variant="outline-light" onClick={handleStop}>Stop</Button>
          </div>
          

      </div>
      <div className="optionsButton">
            <Button 
              onClick={() => setOptions(true)}
              variant="outline-light"
              >
                Options
              </Button>
          </div>
      
      <Graph
        ref={chartRef}
      />

      
        <SideSheet
              isShown={options}
              onCloseComplete={() => setOptions(false)}
            >
              
              <Options
                set1={setKey1}
                set2={setKey2}
                adjust={adjust}
                adjust2={adjust2}
                setAdjust={() => setAdjust(true)}
                setAdjust2={() => setAdjust2(true)}
              />
              
          </SideSheet>
            
      
      
    </div>
  );
}




export default App;
