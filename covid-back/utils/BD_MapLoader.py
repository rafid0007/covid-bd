import json
import random
import pandas as pd
import plotly.express as px
import plotly
import plotly.graph_objects as go
import numpy as np

class BD_MapLoader:
    bd_geo = None
    graphJson = None

    @staticmethod
    def loadBangladeshMap():
        with open("BD_geojson/bangladesh.geojson", 'r') as f:
            bd_geo = json.load(f)
        print(bd_geo.keys())
        return bd_geo

    @staticmethod
    def getInstance():
        if BD_MapLoader.bd_geo == None:
            print("Loading map for the first and last time")
            BD_MapLoader.bd_geo = BD_MapLoader.loadBangladeshMap()
        
        return BD_MapLoader.bd_geo

    @staticmethod
    def getMap_and_Mapdata():
        if BD_MapLoader.graphJson == None:
            print("Loading json data for the first and last time")
            BD_MapLoader.graphJson = BD_MapLoader.getRandom__Mapdata()
        
        return BD_MapLoader.graphJson

    @staticmethod
    def getRandom__Mapdata():
        bd_geo = BD_MapLoader.getInstance()
        df_bd = pd.DataFrame()

        for i, feature in enumerate(bd_geo["features"]):
            df_bd.loc[i, "id"]  = feature["id"]
            df_bd.loc[i, "NAME_3"] = feature["properties"]["NAME_3"]
            df_bd.loc[i, "color"] = random.random()/2

        fig = px.choropleth(
            df_bd,
            geojson=bd_geo,
            locations="id",
            color="color",
            # featureidkey="properties.hasc_2",
            color_continuous_scale="Viridis",
            range_color=(0, 1),
            labels={"NAME_3": "NAME_3"},
            projection="mercator"
        )
        fig.update_layout(margin={"r": 0, "t": 0, "l": 0, "b": 0})
        fig.update_geos(fitbounds="locations", visible=False)

        graphs = [fig]
        graphJSON = json.dumps(graphs, cls=plotly.utils.PlotlyJSONEncoder)
        # print(graphJSON)

        return graphJSON

    @staticmethod
    def testPlotly():
        # df = px.data.iris() # iris is a pandas DataFrame
        # fig = px.scatter(df, x="sepal_width", y="sepal_length", color="species",
        #          size='petal_length', hover_data=['petal_width'])
        fig = go.Figure(data=go.Scatter(
        y = np.random.randn(500),
            mode='markers',
            marker=dict(
                size=16,
                color=np.random.randn(500), #set color equal to a variable
                colorscale='Viridis', # one of plotly colorscales
                showscale=True
            )
        ))
        graphs = [fig]
        graphJSON = json.dumps(graphs, cls=plotly.utils.PlotlyJSONEncoder)

        return graphJSON

    @staticmethod
    def simpleChoroPleth():
        df = pd.read_csv('https://raw.githubusercontent.com/plotly/datasets/master/2011_us_ag_exports.csv')

        for col in df.columns:
            df[col] = df[col].astype(str)

        df['text'] = df['state'] + '<br>' + \
            'Beef ' + df['beef'] + ' Dairy ' + df['dairy'] + '<br>' + \
            'Fruits ' + df['total fruits'] + ' Veggies ' + df['total veggies'] + '<br>' + \
            'Wheat ' + df['wheat'] + ' Corn ' + df['corn']

        fig = go.Figure(data=go.Choropleth(
            locations=df['code'],
            z=df['total exports'].astype(float),
            locationmode='USA-states',
            colorscale='Reds',
            autocolorscale=False,
            text=df['text'], # hover text
            marker_line_color='white', # line markers between states
            colorbar_title="Millions USD"
        ))

        fig.update_layout(
            title_text='2011 US Agriculture Exports by State<br>(Hover for breakdown)',
            geo = dict(
                scope='usa',
                projection=go.layout.geo.Projection(type = 'albers usa'),
                showlakes=True, # lakes
                lakecolor='rgb(255, 255, 255)'),
        )

        graphs = [fig]
        graphJSON = json.dumps(graphs, cls=plotly.utils.PlotlyJSONEncoder)

        return graphJSON


    @staticmethod
    def getRandomHeatMap():
        area_id = []
        with open("utils/bd_area_id.json", 'r') as f:
            area_id = json.load(f)

        heat_map = []
        for area in area_id:
            heat_map.append({
                'id': area,
                'state': area,
                'value': random.randint(1,100)
            })
        
        return heat_map