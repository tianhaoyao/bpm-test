import Chart from "react-apexcharts";
import { useState, useImperativeHandle, forwardRef, useEffect} from "react";


const Graph = forwardRef((props, ref) => {
    // console.log('CHART')
    const [options, setOptions] = useState(
        {
            fill: {
                type: "gradient",
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.7,
                    opacityTo: 0.9,
                    stops: [0, 90, 100]
                }
            },
            xaxis: {
                type: 'numeric',
            },
            tooltip: {
                enabled: false
            },
            chart: {
                animations: {
                    enabled: false
                }
            }
        }
    )
    const [series, setSeries] = useState([
        {
            name: "BPM",
            data: []
        }  
    ])

    const update = (x, y) => {
        setSeries(data => {
            return [
                {
                    name: "BPM",
                    data: [...data[0].data, {x: x, y: y}]
                }  
            ]
        })
    }
    const reset = () => {
        setSeries(data => {
            return [
                {
                    name: "BPM",
                    data: []
                }  
            ]
        })
    }
    useImperativeHandle(ref, () => {
        return {
            update: update,
            reset: reset
        }
    })

    return (
        <div>
            <Chart
              options={options}
              series={series}
              type="area"
            />
        </div>
    )
})

export default Graph