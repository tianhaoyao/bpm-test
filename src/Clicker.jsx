import React from 'react';
import { PropTypes } from 'prop-types';
import { Pane, Text } from 'evergreen-ui';

function Clicker({
  key1, key2, k1, k2,
}) {
  return (
    <div className="clicker">

      <Pane
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {key1

          ? (
            <Pane
              elevation={0}
              float="left"
              backgroundColor="#997e79"
              width={116}
              height={116}
              margin={31}
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              id="k1"
            >
              <Text color="white"><h2>{k1}</h2></Text>

            </Pane>
          )

          : (
            <Pane
              elevation={4}
              float="left"
              backgroundColor="#c4aca7"
              width={130}
              height={130}
              margin={24}
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              id="k2"
            >

              <Text color="white"><h1>{k1}</h1></Text>

            </Pane>
          )}
        {key2

          ? (
            <Pane
              elevation={0}
              float="left"
              backgroundColor="#997e79"
              width={116}
              height={116}
              margin={31}
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              <Text color="white"><h2>{k2}</h2></Text>

            </Pane>
          )

          : (
            <Pane
              elevation={4}
              float="left"
              backgroundColor="#c4aca7"
              width={130}
              height={130}
              margin={24}
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >

              <Text color="white"><h1>{k2}</h1></Text>

            </Pane>
          )}
      </Pane>

    </div>
  );
}

export default Clicker;

Clicker.propTypes = {
  key1: PropTypes.bool.isRequired,
  key2: PropTypes.bool.isRequired,
  k1: PropTypes.string.isRequired,
  k2: PropTypes.string.isRequired,
};
