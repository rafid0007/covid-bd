import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bar, defaults } from 'react-chartjs-2'
import { merge } from 'lodash';

merge(defaults, {
    global: {
        responsive: false
    }
}
);

export const SucceptiblePopulation = () => {
    // Chart.defaults.global.responsive = false;

    const [chartData, setChartData] = useState({})
    const [chartOptions, setChartOptions] = useState({})

    const updateData = (json_data) => {
        console.log("checking <SucceptiblePopulation> values", json_data)

        var datasets = []
        for (var i = 0; i < json_data['data'].length; i++) {
            var data_obj = {
                'legend': json_data['data'][i]['label'],
                'data': json_data['data'][i]['value'],
                'label': json_data['data'][i]['label'],
                'type': 'bar',
                'lineTension': 0,
                'borderWidth': 1,
                'backgroundColor': json_data['data'][i]['color'],
                'borderColor': json_data['data'][i]['color'],
                'pointBackgroundColor': json_data['data'][i]['color'],
                'pointRadius': 2,
                'fill': false,
                'fillOpacity': .3,
                'spanGaps': true
            }
            datasets.push(data_obj)
        }

        // console.log(json_data['labels'])
        var chartData = {
            'labels': json_data['labels'],
            'datasets': datasets,
            // 'lineAtIndex': [1,2,3,4]
        }
        var options = {
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: json_data['x_axis']
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: json_data['y_axis']
                    }
                }]
            },
            legend: {
                display: true,
                position: 'top',
                // labels: {
                //   fontColor: "#000080",
                // }
            }
        }

        setChartData(chartData)
        setChartOptions(options)
    }

    const refreshChartData = () => {
        console.log("refreshing chart data")
        fetch('/api/succeptible_population').then(response => {
            if (response.ok) {
                return response.json()
            }
        }).then(data => {
            updateData(data)
        })
    }

    useEffect(() => {
        fetch('/api/succeptible_population').then(response => {
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
                    Succeptible Population
                </h2>
                <div className="container" style={{ display: 'flex', alignItems: 'center' }}>
                    <Bar data={chartData} options={chartOptions} width={600} height={300} />
                </div>
                <button onClick={refreshChartData}>Refresh</button>
            </div>
        </>
    )
}