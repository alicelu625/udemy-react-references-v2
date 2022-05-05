import React from 'react';

import './ChartBar.css';

const ChartBar = (props) => {
    //initialize bar fill's height as 0%
    let barFillHeight = '0%';
    //calculate % by which the bar should be filled
    if (props.maxValue > 0) {
        barFillHeight = Math.round((props.value / props.maxValue) * 100) + '%';
    }

    return (
        <div className='chart-bar'>
            <div className='chart-bar__inner'>
                {/*how much the chart bar should be filled (color change based on calculated height)*/}
                <div
                    className='chart-bar__fill'
                    style={{ height: barFillHeight }}
                ></div>
            </div>
            <div className='chart-bar__label'>{props.label}</div>
        </div>
    );
};

export default ChartBar;