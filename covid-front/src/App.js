import logo from './logo.svg';
import './App.css';
import { HomePage } from './Pages/HomePage'
import { Dashboard } from './Pages/Dashboard'
// import Plot from 'react-plotly.js';
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from 'react-plotly.js/factory'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import React from 'react';

// const Plotly = window.Plotly;
const Plot = createPlotlyComponent(Plotly);

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>

          <Route exact path='/'>
            <HomePage/>
          </Route>

          <Route exact path='/dashboard'>
            <Dashboard/>
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
