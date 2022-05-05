import React from 'react';

import ChartBar from './ChartBar';
import './Chart.css';

const Chart = (props) => {
    //get array of data point values
    const dataPointValues = props.dataPoints.map(dataPoint => dataPoint.value);
    //find maximum value from data points
    //spread operator used to pull array elements & add them as standalone arguments
    //(max operator only accepts list of arguments)
    const totalMaximum = Math.max(...dataPointValues);

    return (
        <div className='chart'>
            {/*create a ChartBar component for each data point*/}
            {props.dataPoints.map((dataPoint) => (
                <ChartBar
                    key={dataPoint.label}
                    value={dataPoint.value}
                    maxValue={totalMaximum}
                    label={dataPoint.label}
                />
            ))}
        </div>
    );
};

export default Chart;