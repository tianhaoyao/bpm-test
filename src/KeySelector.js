import { useState, useEffect } from "react";
function KeySelector({set, adjust, setAdjust}) {

    const a = useKeyPress()

    const submitKey = (key) => {
        set(key);
    }

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
        }, [adjust]); // Empty array ensures that effect is only run on mount and unmount
        return keyPressed;
      }

    return (
        <div>
            
            <p>{adjust ? <p>SETTING</p> : <p>NOT SETTING</p>}</p>
            <button onClick={setAdjust}>r</button>
        </div>
    )
}

export default KeySelector;