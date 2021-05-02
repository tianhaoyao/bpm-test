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

            dataLabels: {
                enabled: false
            },

            
            xaxis: {
                type: 'numeric',
                range: 10,
                min: 0,
                max: 10
            },
            yaxis: {
                type: 'numeric',
                range: 200,
                min: 100,
                max: 300
            },
            tooltip: {
                enabled: false
            },
            chart: {
                animations: {
                    enabled: true
                }
            }
        }
    )
    const [series, setSeries] = useState([
        {
            name: "BPM",
            data: []
        } 
        ,
        {
            name: "CURRENTBPM",
            data: []
        }  
    ])

    const update = (x, y, y2, counter) => {
        //if(counter % 2 == 0) return
        setSeries(data => {
            return [
                {
                    name: "BPM",
                    data: [...data[0].data, {x: x, y: y}]
                }
                ,
                {
                    name: "CURRENTBPM",
                    data: [...data[1].data, {x: x, y: y2}]
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
                ,
                {
                    name: "CURRENTBPM",
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