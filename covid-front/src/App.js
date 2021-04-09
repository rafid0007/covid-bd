import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

// library imports
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from 'react-plotly.js/factory';
// import Plot from 'react-plotly.js';

// custom component imports
import TopBar from './Components/topBar/topBar';
import { HomePage } from './Pages/HomePage';

// style imports
import './App.css';


// const Plotly = window.Plotly;
const Plot = createPlotlyComponent(Plotly);

function App() {
  return (
    <div className="App">
      <TopBar/>
      <Router>
        <Switch>
          <Route exact path='/'>
            <HomePage/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
