import {XYPlot, XAxis, YAxis, HorizontalGridLines,LineSeries, AreaSeries} from 'react-vis';

function Graph(props) {


    return (
        <div>
            <XYPlot
                width={600}
                height={300}
                animation={true}
                // xDomain={[0, 10]}
                >
                <HorizontalGridLines />
                <AreaSeries
                    color="red"
                    curve={'curveMonotoneX'}
                    data={props.data}/>
                <XAxis title="X" />
                <YAxis />
            </XYPlot>
        </div>
    )
}

export default Graph