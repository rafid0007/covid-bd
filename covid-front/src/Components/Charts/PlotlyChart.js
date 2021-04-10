import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bar, defaults } from 'react-chartjs-2'
import { merge } from 'lodash';
import { scaleQuantile } from 'd3-scale';


// import Plot from 'react-plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';
import Plotly from "plotly.js-basic-dist";
import Button from '@material-ui/core/Button';

const Plot = createPlotlyComponent(Plotly);


export const PlotlyChart = () => {

    const [data, setData] = useState({})
    const [layout, setLayout] = useState({})


    const updateData = (json_data) => {
        // console.log("checking <Map> values", json_data)
        // console.log("<DATA> ----> ", data)
        // console.log("<LAYOUT> -->", layout)

        setData(json_data[0].data)
        setLayout(json_data[0].layout)
    }

    const refreshChartData = () => {
        console.log("refreshing chart data")
        fetch('/api/map_data').then(response => {
            if (response.ok) {
                return response.json()
            }
        }).then(data => {
            updateData(data)
        })
    }

    useEffect(() => {
        fetch('/api/map_data').then(response => {
            if (response.ok) {
                return response.json()
            }
        }).then(data => {
            updateData(data)
        })
    }, [])

    return (
        <>
            {/* <div class="box" width="800" height="400">
                <h2>
                    PLotly Scatter plot
                </h2> */}
            {/* <div class="container"> */}
            <div class="container" style={{ display: 'flex', alignItems: 'center' }}>
                <Plot data={data} layout={{ width: 620, height: 400 }} />
            </div>
            {/* </div> */}
            {/* <div>
                    <Button variant="contained" onClick={refreshChartData}>Refresh</Button>
                </div> */}
            {/* </div> */}
        </>
    )
}