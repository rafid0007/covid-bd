import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Line, defaults } from 'react-chartjs-2'
import { merge } from 'lodash';

merge(defaults, {
    global: {
        responsive: false
    }
}
);

export const ObservableImpact = () => {
    // Chart.defaults.global.responsive = false;

    const [chartData, setChartData] = useState({})
    const [chartOptions, setChartOptions] = useState({})

    const updateData = (observableImpact) => {
        console.log("checking <ObservableImpact> values", observableImpact)

        var labels = makeLabels()
        var bubbles = makeBubbles()

        var datasets = [
            {
                type: 'line',
                label: 'regression line',
                data: labels.labels,
                fill: false,
                backgroundColor: "rgba(218,83,79, .7)",
                borderColor: "rgba(218,83,79, .7)",
                pointRadius: 0
            },
            {
                type: 'bubble',
                label: 'data points',
                data: bubbles,
                backgroundColor: "rgba(76,78,80, .7)",
                borderColor: "transparent"
            }
        ]
        // console.log(makeLabels())
        // console.log(makeBubbles())
        // console.log(">>>>", datasets)
        var options = {
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom',
                    ticks: {
                        autoSkip: true,
                        max: Math.max(...labels.array)
                    },
                    scaleLabel: {
                        display: true,
                        labelString: observableImpact['x_axis']
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: observableImpact['y_axis']
                    }
                }]
            }
        }

        var data = {
            labels: labels.labels,
            datasets: datasets
        }


        setChartData(data)
        setChartOptions(options)

        function makeLabels() {
            var arr = []
            for (var i = 0; i < observableImpact['point_arr'].length; i++) arr.push(observableImpact['point_arr'][i]['x'])

            arr = arr.sort((a, b) => a - b);
            let newarr = arr.map(item => ({ x: item, y: observableImpact['regression_line']['py'] + (item - observableImpact['regression_line']['px']) * observableImpact['regression_line']['slope'] }));
            return {
                labels: newarr,
                array: arr
            };
        };

        function makeBubbles() {
            return observableImpact['point_arr']
        };


    }

    const refreshChartData = () => {
        console.log("refreshing chart data")
        fetch('/api/observableimpact').then(response => {
            if (response.ok) {
                return response.json()
            }
        }).then(data => {
            updateData(data)
        })
    }

    useEffect(() => {
        fetch('/api/observableimpact').then(response => {
            if (response.ok) {
                return response.json()
            }
        }).then(data => {
            updateData(data)
        })
    }, [])

    return (
        <>
            <div className="box">
                <h2>
                    Obseravable impact on daily cases
                </h2>
                <div className="container" style={{ display: 'flex', alignItems: 'center' }}>
                    <Line data={chartData} options={chartOptions} width={600} height={300} />
                </div>
                <button onClick={refreshChartData}>Refresh</button>
            </div>
        </>
    )
}