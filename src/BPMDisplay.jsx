import React from 'react';
import { PropTypes } from 'prop-types';

function BPMDisplay(props) {
  const { bpm } = props;
  return (
    <div>
      <h1 id="bpm">
        {bpm.toFixed(2)}
        {' '}
        bpm
      </h1>
    </div>
  );
}
BPMDisplay.propTypes = {
  bpm: PropTypes.number.isRequired,
};

export default BPMDisplay;
