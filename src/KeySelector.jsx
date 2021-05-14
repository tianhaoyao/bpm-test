import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Button } from 'react-bootstrap';

function KeySelector({
  set, adjust, setAdjust, k,
}) {
  function useKeyPress() {
    // State for keeping track of whether key is pressed
    const [keyPressed, setKeyPressed] = useState(false);
    // If pressed key is our target key then set to true
    function downHandler({ key }) {
      if (key) {
        if (adjust) {
          set(key);
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
      window.addEventListener('keydown', downHandler);
      window.addEventListener('keyup', upHandler);
      // Remove event listeners on cleanup
      return () => {
        window.removeEventListener('keydown', downHandler);
        window.removeEventListener('keyup', upHandler);
      };
    }, [adjust]);
    return keyPressed;
  }

  useKeyPress();

  return (
    <div className="option-item">
      {adjust ? (
        <div className="overlay">
          <div className="message">
            <h3>press any key to set</h3>
          </div>

        </div>
      ) : null}
      <div>
        <h4>
          Set
          {` ${k}`}
          :
          {' '}
        </h4>
        <Button variant="secondary" onClick={setAdjust} block>Set</Button>

      </div>
    </div>
  );
}

export default KeySelector;

KeySelector.propTypes = {
  set: PropTypes.func.isRequired,
  adjust: PropTypes.bool.isRequired,
  setAdjust: PropTypes.func.isRequired,
  k: PropTypes.string.isRequired,
};
