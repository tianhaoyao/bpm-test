import Chart from 'react-apexcharts';
import { PropTypes } from 'prop-types';
import React, {
  useState, useImperativeHandle, forwardRef, useEffect,
} from 'react';

const Graph = forwardRef((props, ref) => {
  const [options, setOptions] = useState({
    colors: ['#2a2a2a', '#959595'],
    fill: {
      type: 'solid',
      opacity: 0.1,

    },

    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },

    xaxis: {
      type: 'numeric',
      range: 10,
      min: 0,
      max: 10,
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      type: 'numeric',
      range: 300,
      min: 50,
      max: 350,
      show: false,
    },
    grid: {
      show: false,
    },
    tooltip: {
      enabled: true,
      theme: 'dark',
      x: {
        formatter: (time) => `${time.toFixed(2)} seconds`,
      },
    },
    chart: {
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 1,
        animateGradually: {
          enabled: true,
          delay: 100,
        },
      },
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    stroke: {
      show: true,
      curve: 'smooth',
      width: 4,
    },
  });

  useEffect(() => {
    setOptions({
      ...options,
      tooltip: {
        enabled: !props.showTT,
      },
    });
  }, [props.showTT]);

  const [series, setSeries] = useState([
    {
      name: 'Overall BPM',
      data: [],
    },
    {
      name: 'Instant BPM',
      data: [],
    },
  ]);

  const update = (x, y, y2) => {
    // if(counter % 2 == 0) return
    setSeries((data) => [
      {
        ...data[0],
        data: [...data[0].data, { x, y }],
      },
      {
        ...data[1],
        data: [...data[1].data, { x, y: y2 }],
      },
    ]);
  };
  const reset = () => {
    setSeries(() => [
      {
        name: 'Overall BPM',
        data: [],
      },
      {
        name: 'Instant BPM',
        data: [],
      },
    ]);
  };
  useImperativeHandle(ref, () => ({
    update,
    reset,
  }));

  return (
    <div className="graph">
      <Chart
        className="chart"
        options={options}
        series={series}
        type="area"
        height="100%"
        width="100%"
      />
    </div>
  );
});
Graph.propTypes = {
  showTT: PropTypes.bool.isRequired,
};

export default Graph;
