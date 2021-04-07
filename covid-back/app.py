from flask import Flask, jsonify
# from flask import render_template
from datetime import time
import random
import os
import json
import pandas as pd
import plotly.express as px
import plotly
import plotly.express as px
import plotly

from utils.BD_MapLoader import BD_MapLoader

app = Flask(__name__)
 
def dir_last_updated(folder):
    return str(max(os.path.getmtime(os.path.join(root_path, f))
                   for root_path, dirs, files in os.walk(folder)
                   for f in files))


def getRandom__RareImpactData():
    labels = []
    for i in range(300):
        labels.append(str(i))
    mobility_drop = []
    daily_case = []
    test_pos = []
    R_t0 = []
    R_t1 = []

    mobility_drop.append(random.uniform(-1,8))
    daily_case.append(random.uniform(-1, 8))
    test_pos.append(random.uniform(-1, 8))
    R_t0.append(random.uniform(-1, 8))
    R_t1.append(random.uniform(max(-1, R_t0[0] - .3), min(8, R_t0[0] + .3)))

    null_arr = []
    for i in range(1, len(labels)):
        if(i in null_arr):
            mobility_drop.append(None)
            daily_case.append(None)
            R_t0.append(None)
            R_t1.append(None)
            test_pos.append(None)
            continue

        if((i-1) not in null_arr):
            mobility_drop.append(random.uniform(max(-1, mobility_drop[i-1] - .3), min(8, mobility_drop[i-1] + .3)))
            daily_case.append(random.uniform(max(-1, daily_case[i-1] - .3), min(8, daily_case[i-1] + .3)))
            test_pos.append(random.uniform(max(-1, test_pos[i-1] - .3), min(8, test_pos[i-1] + .3)))
            R_t0.append(random.uniform(max(-1, R_t0[i-1] - .3), min(8, R_t0[i-1] + .3)))
            R_t1.append(random.uniform(max(-1, R_t1[i-1] - .3), min(8, R_t1[i-1] + .3)))
        else:
            mobility_drop.append(1)
            daily_case.append(2)
            R_t0.append(3)
            R_t1.append(4)
            test_pos.append(5)

    values = [
        {
            'value': mobility_drop, 'label': 'Drops in mobility', 'color': "rgba(0,0,0)"
        },
        {
            'value': daily_case, 'label': 'Daily Cases', 'color': "rgba(29, 10, 240)"
        },
        {
            'value': test_pos, 'label': 'Test positive rate', 'color': "rgba(58, 156, 9)"
        },
        {
            'value': R_t0, 'label': 'R_t0', 'color': "rgba(235, 9, 28, .5)"
        },
        {
            'value': R_t1, 'label': 'R_t1', 'color': "rgba(235, 9, 28, .5)"
        },
    ]

    annotations = [
        {
            'text': 'L1', 'color': 'red', 'value': '50'
        },
        {
            'text': 'L2', 'color': 'blue', 'value': '100'
        },
        {
            'text': 'L3', 'color': 'green', 'value': '200'
        }
    ]

    return {
        'values': values,
        'annotations': annotations,
        'x_labels': labels
    }

def getRandom__BarChart():
    labels = ['1-10', '11-20', '21-30', '31-40', '41-50', '51-60', '60+']
    population = []
    succeptible_population = []
    for i in range(len(labels)):
        population.append(random.uniform(5,35))
        succeptible_population.append(random.uniform(4, population[i]))

    data = [
        {
            'value': population, 'label': 'Population', 'color': "blue"
        },
        {
            'value': succeptible_population, 'label': 'Susceptible population', 'color': "orange"
        }
    ]

    return {
        'labels': labels,
        'data': data,
        'y_axis': "Population (in million)",
        'x_axis': "Age group"
    }


def getRandom__ObservableImpactData():
    # point_arr = [{
    #     'x': 5, 'y': 5
    # }]
    point_arr = []
    for i in range(300):
        point_arr.append({
            'x': random.uniform(0, 3000), 
            'y': random.uniform(0, 25)
        })
    
    regression_line = {'px': random.uniform(0,5), 'py': random.uniform(0,5), 'slope': random.uniform(.003, .007)}

    return {
        'x_axis': 'Total positive rate (in %)',
        'y_axis': 'Daily Cases',
        'point_arr': point_arr,
        'regression_line': regression_line, 
    }

def getRandom__BarChart():
    labels = ['1-10', '11-20', '21-30', '31-40', '41-50', '51-60', '60+']
    population = []
    succeptible_population = []
    for i in range(len(labels)):
        population.append(random.uniform(5,35))
        succeptible_population.append(random.uniform(4, population[i]))

    data = [
        {
            'value': population, 'label': 'Population', 'color': "blue"
        },
        {
            'value': succeptible_population, 'label': 'Susceptible population', 'color': "orange"
        }
    ]

    return {
        'labels': labels,
        'data': data,
        'y_axis': "Population (in million)",
        'x_axis': "Age group"
    }

@app.route("/api/rareimpact")
def getRareImpactData():
    rareImpact = getRandom__RareImpactData()
    return rareImpact

@app.route("/api/observableimpact")
def getObservableImpactData():
    observableImpact = getRandom__ObservableImpactData()
    return observableImpact

@app.route("/api/succeptible_population")
def getSucceptiblePopulationData():
    succeptible_population = getRandom__BarChart()
    return succeptible_population

@app.route("/api/map_data")
def getMapData():
    # mapdata = BD_MapLoader.getMap_and_Mapdata()
    mapdata = BD_MapLoader.testPlotly()
    # mapdata = BD_MapLoader.simpleChoroPleth()
    # mapdata = BD_MapLoader.getInstance()
    return mapdata

@app.route("/api/heat_map")
def getheatmap():
    mapdata = BD_MapLoader.getRandomHeatMap()
    return jsonify(mapdata)

if __name__ == "__main__":
    app.run(
                host=os.getenv('IP', '0.0.0.0'), 
                port=int(os.getenv('PORT', 5000)), 
                debug=True
            )