import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

function KeySelector({set, adjust, setAdjust, k}) {

    useKeyPress();

    function useKeyPress() {
        // State for keeping track of whether key is pressed
        const [keyPressed, setKeyPressed] = useState(false);
        // If pressed key is our target key then set to true
        function downHandler({ key }) {
          if (key) {
            if(adjust) {
                console.log(set)
                set(key)
            }
            
            setKeyPressed(true);
          }
        }
        // If released key is our target key then set to false
        const upHandler = ({ key }) => {
          if (key) {
            setKeyPressed(false);
          }
        };
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
        }, [adjust]); // eslint-disable-line react-hooks/exhaustive-deps
        return keyPressed;
      }

    return (
        <div>
            {adjust ? <div className="overlay">
              <div className="message">
                <h3>press any key to set</h3>
              </div>
            
            </div> : null}
            <div style={{paddingTop: "10vh", paddingLeft: "3vw", paddingRight: "3vw", fontFamily: 'Comfortaa'}}>

              <h4>Set {k}: </h4>
              <Button variant="secondary" onClick={setAdjust} block>Set</Button>

            </div>
        </div>
    )
}

export default KeySelector;