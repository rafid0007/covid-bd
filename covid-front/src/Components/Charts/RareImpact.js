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

export const RareImpact = () => {
    // Chart.defaults.global.responsive = false;

    const [chartData, setChartData] = useState({})
    const [chartOptions, setChartOptions] = useState({})

    const updateLineObject = (rareImpact) => {
        console.log("checking <RareImpact> values", rareImpact['values'])

        var data = rareImpact['values']
        var annotations = rareImpact['annotations']
        var label = rareImpact['x_labels']

        var datasets = []
        for (var i = 0; i < data.length; i++) {
            var data_obj = {
                'legend': data[i]['label'],
                'data': data[i]['value'],
                'label': data[i]['label'],
                'type': 'line',
                'lineTension': 0,
                'borderWidth': 1,
                'backgroundColor': data[i]['color'],
                'borderColor': data[i]['color'],
                // 'pointColor': data[i]['color'],
                // 'fillColor': data[i]['color'],
                // 'fill': true,
                'pointBackgroundColor': data[i]['color'],
                'pointRadius': 2,
                'fill': false,
                'fillOpacity': .3,
                'spanGaps': true
            }
            if (data[i]['label'] == 'R_t0') data_obj['fill'] = '+1'
            // if(data[i]['label'] == 'R_t1') data_obj['fill'] = true

            // console.log(data[i]['label'], data_obj['fill'])

            datasets.push(data_obj)
        }

        var chartData = {
            'labels': label,
            'datasets': datasets,
            // 'lineAtIndex': [1,2,3,4]
        }

        var annotation_formatted = []
        for (var i = 0; i < annotations.length; i++) {
            annotation_formatted.push(
                {
                    type: "line",
                    connectNullData: true,
                    mode: "vertical",
                    scaleID: "x-axis-0",
                    value: annotations[i]['value'],
                    borderColor: annotations[i]['color'],
                    borderWidth: 3,
                    label: {
                        content: annotations[i]['text'],
                        enabled: true,
                        position: "top"
                    }
                }
            )
        }

        var chartOptions = {
            annotation: {
                annotations: annotation_formatted
            },
            scales: {
                xAxes: [{
                    ticks: {
                        userCallback: function (item, index) {
                            // console.log(" >>>> ", item, index)
                            if (!(index % 20)) return item;
                            return "";
                        },
                        autoSkip: false,
                        // color: 'rgba(0, 0, 0, 1)'
                    },
                    display: true
                }],
            },
            legend: {
                display: true,
                position: 'bottom',
                // labels: {
                //   fontColor: "#000080",
                // }
            },
            maintainAspectRatio: false
        }

        setChartData(chartData)
        setChartOptions(chartOptions)
    }

    const refreshChartData = () => {
        console.log("refreshing chart data")
        fetch('/api/rareimpact').then(response => {
            if (response.ok) {
                return response.json()
            }
        }).then(data => {
            // console.log(data)
            // setTodo(data)
            updateLineObject(data)
        })
    }

    useEffect(() => {
        fetch('/api/rareimpact').then(response => {
            if (response.ok) {
                return response.json()
            }
        }).then(data => {
            // console.log(data)
            // setTodo(data)
            updateLineObject(data)
        })
    }, [])

    return (
        <>
            <div class="box">
                {/* <h2>
                Rare impact on daily cases
                </h2> */}
                <div class="container" style={{ display: 'flex', alignItems: 'center' }}>
                    <Line data={chartData} options={chartOptions} width={600} height={300} />
                </div>
                {/* <button onClick={refreshChartData}>Refresh</button> */}
            </div>
        </>
    )
}