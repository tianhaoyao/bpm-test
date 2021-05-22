import React from 'react';
import { PropTypes } from 'prop-types';
import { Table } from 'react-bootstrap';

function Leaderboards({ leaderboards }) {
  return (
    <div className="leaderboards">
      <Table striped bordered hover>
        <thead>
          <th>#</th>
          <th>bpm</th>
          <th>ur</th>
          <th>time</th>
          <th>clicks</th>
        </thead>
        <tbody>
          {leaderboards.map((score, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{score.bpm}</td>
              <td>{score.unstable}</td>
              <td>{score.testTime}</td>
              <td>{score.counter}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Leaderboards;

Leaderboards.propTypes = {
  leaderboards: PropTypes.arrayOf(PropTypes.oneOfType(
    [
      PropTypes.number,
      PropTypes.string,
    ],
  )).isRequired,
};
