import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bar, defaults } from 'react-chartjs-2'
import { merge } from 'lodash';
import { scaleQuantile } from 'd3-scale';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import ReactTooltip from 'react-tooltip';
import {
    ComposableMap,
    Geographies,
    Geography,
} from "react-simple-maps"
import LinearGradient from './LinearGradient.js';

const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"

const geographyStyle = {
    default: {
        outline: 'none'
    },
    hover: {
        fill: '#ccc',
        transition: 'all 250ms',
        outline: 'none'
    },
    pressed: {
        outline: 'none'
    }
};

const INDIA_TOPO_JSON = require('./india.topo.json');
const BD_TOPO_JSON = require('../Data/bd_topo.json');
const DEFAULT_COLOR = '#EEE';
// Red Variants
const COLOR_RANGE = [
    '#ffedea',
    '#ffcec5',
    '#ffad9f',
    '#ff8a75',
    '#ff5533',
    '#e2492d',
    '#be3d26',
    '#9a311f',
    '#782618'
];
const gradientData = {
    fromColor: COLOR_RANGE[0],
    toColor: COLOR_RANGE[COLOR_RANGE.length - 1],
    min: 0,
    max: 100
  };

const PROJECTION_CONFIG = {
    scale: 40,
    center: [90.412518, 23.810332] // always in [East Latitude, North Longitude]
};


export const MapChart = () => {

    const [tooltipContent, setTooltipContent] = useState('');
    const [heatmap, setHeatMap] = useState([]);

    const onMouseLeave = () => {
        // console.log("mouse leaving")
        setTooltipContent('');
    };

    const onMouseEnter = (geo, current = { value: 'NA' }) => {
        // console.log("current >> ", current, geo.properties)
        return () => {
            setTooltipContent(`${current.id}: ${current.value}`);
        };
    }

    const getHeatMapData = () => {
        console.log("refreshing heat map data")
        fetch('/api/heat_map').then(response => {
            if(response.ok){
                return response.json()
            }
        }).then(data => {
            // console.log(data)
            setHeatMap(data)
        })
    }

    const colorScale = scaleQuantile()
        .domain(heatmap.map(d => d.value))
        .range(COLOR_RANGE);

    useEffect(() => {
        fetch('/api/heat_map').then(response => {
            if (response.ok) {
                return response.json()
            }
        }).then(data => {
            // console.log(" >>> checking input", data)
            setHeatMap(data)
            // console.log("heat map", heatmap)
        })

    }, [])

    return (
        <>
            <div class="box" width="800" height="400">
                <h2>
                    Map
                </h2>
                <ReactTooltip>{tooltipContent}</ReactTooltip>
                <ComposableMap
                    projectionConfig={PROJECTION_CONFIG}
                    projection="geoMercator"
                    width={10}
                    height={6}
                    data-tip=""
                >
                    <Geographies geography={BD_TOPO_JSON}>
                        {({ geographies }) =>
                            geographies.map(geo => {
                                const current = heatmap.find(s => s.id === geo.id);
                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        fill={current ? colorScale(current.value) : DEFAULT_COLOR}
                                        style={geographyStyle}
                                        onMouseEnter={onMouseEnter(geo, current)}
                                        onMouseLeave={onMouseLeave}
                                    />
                                )
                            }
                            )}
                    </Geographies>
                </ComposableMap>
                <div><LinearGradient data={gradientData} /></div>
                <div>
                    <button onClick={getHeatMapData}>Refresh</button>
                </div>
            </div>
        </>
    )
}