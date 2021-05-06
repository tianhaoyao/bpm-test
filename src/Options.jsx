import React from 'react';
import { PropTypes } from 'prop-types';
import KeySelector from './KeySelector';

function Options({
  set1, set2, adjust, adjust2, setAdjust, setAdjust2,
}) {
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
  );
}
Options.propTypes = {
  set1: PropTypes.func.isRequired,
  set2: PropTypes.func.isRequired,
  adjust: PropTypes.bool.isRequired,
  adjust2: PropTypes.bool.isRequired,
  setAdjust: PropTypes.func.isRequired,
  setAdjust2: PropTypes.func.isRequired,
};

export default Options;
