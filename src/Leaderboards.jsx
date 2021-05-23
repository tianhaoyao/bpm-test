import React from 'react';
import { PropTypes } from 'prop-types';
import {
  ListGroup,
  Card,
  Container,
  Col,
  Row,
} from 'react-bootstrap';

function Leaderboards({ leaderboards }) {
  const listGroupStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    paddingLeft: '1rem',
    paddingTop: '1rem',
  };
  const cardStyle = {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: '1rem',
  };
  const cardBodyStyle = {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'nowrap',
  };
  const cardTextStyle = {
    flexDirection: 'col',
  };
  return (
    <div className="leaderboards">
      <ListGroup variant="flush" style={listGroupStyle}>
        <ListGroup.Item style={{ backgroundColor: 'transparent' }}>
          {leaderboards.map((score, index) => (
            <Card style={cardStyle}>
              <Card.Header>{index + 1}</Card.Header>
              <Card.Body>
                <Container>
                  <Row>
                    <Col>
                      <h2>{score.bpm}</h2>
                    </Col>
                    <Col>

                      <p>{score.unstable}</p>
                      <p>{score.testTime}</p>
                      <p>{score.counter}</p>

                    </Col>
                  </Row>
                </Container>
              </Card.Body>
              {/* <p>{score.bpm}</p>
              <p>{score.unstable}</p>
              <p>{score.testTime}</p>
              <p>{score.counter}</p> */}
            </Card>
          ))}
        </ListGroup.Item>
      </ListGroup>
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
