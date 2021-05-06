import Chart from 'react-apexcharts';
import React, { useState, useImperativeHandle, forwardRef } from 'react';

const Graph = forwardRef((props, ref) => {
  const options = {
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
      enabled: false,
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
    },
    stroke: {
      show: true,
      curve: 'smooth',
      width: 4,
    },
  };

  const [series, setSeries] = useState([
    {
      name: 'BPM',
      data: [],
    },
    {
      name: 'CURRENTBPM',
      data: [],
    },
  ]);

  const update = (x, y, y2) => {
    // if(counter % 2 == 0) return
    setSeries((data) => [
      {
        name: 'BPM',
        data: [...data[0].data, { x, y }],
      },
      {
        name: 'CURRENTBPM',
        data: [...data[1].data, { x, y: y2 }],
      },
    ]);
  };
  const reset = () => {
    setSeries(() => [
      {
        name: 'BPM',
        data: [],
      },
      {
        name: 'CURRENTBPM',
        data: [],
      },
    ]);
  };
  useImperativeHandle(ref, () => ({
    update,
    reset,
  }));

  return (
    <div>
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

export default Graph;
