import React from 'react';
import { PropTypes } from 'prop-types';
import {
  Form, Col, Row,
} from 'react-bootstrap';
import KeySelector from './KeySelector';

function Options({
  set1, set2, adjust, adjust2, setAdjust, setAdjust2, testTime, setTestTime,
}) {
  const optionItemStyle = {
    paddingLeft: '3vw',
    paddingRight: '3vw',
    fontFamily: 'Comfortaa',
    paddingTop: '10vh',
  };
  return (
    <div className="options">
      <Form>
        <KeySelector
          set={set1}
          style={optionItemStyle}
          adjust={adjust}
          setAdjust={() => setAdjust(true)}
          k="Key 1"
        />
        <KeySelector
          set={set2}
          style={optionItemStyle}
          adjust={adjust2}
          setAdjust={() => setAdjust2(true)}
          k="Key 2"
        />
        <Form.Group as={Row} className="option-item">
          <Col xs="10">
            <Form.Group className="time-range" controlId="formBasicRange">
              <Form.Label>
                <h4>Test Time (Sec)</h4>
              </Form.Label>
              <Form.Control
                type="range"
                value={testTime}
                onChange={(e) => { setTestTime(parseInt(e.target.value, 10)); }}
              />
            </Form.Group>
          </Col>
          <Col xs="2" style={{ 'align-self': 'center' }}>
            <Form.Control
              value={testTime}
              onChange={(e) => { setTestTime(parseInt(e.target.value, 10)); }}
            />
          </Col>
        </Form.Group>
      </Form>
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
  testTime: PropTypes.number.isRequired,
  setTestTime: PropTypes.func.isRequired,
};

export default Options;
