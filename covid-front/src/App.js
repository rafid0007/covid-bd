import React from 'react';
import { Switch, Route } from "react-router-dom";

// library imports
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from 'react-plotly.js/factory';
// import Plot from 'react-plotly.js';

// custom component imports
import TopBar from './Components/topBar/topBar';
import { HomePage } from './Pages/HomePage';

// style imports
import './App.css';
import AboutPage from './Pages/AboutPage/AboutPage';


// const Plotly = window.Plotly;
const Plot = createPlotlyComponent(Plotly);

function App() {
  return (
    <div className="App">
      <TopBar />
      <Switch>
        <Route path='/home'>
          <HomePage />
        </Route>
        <Route path='/about'>
          <AboutPage></AboutPage>
        </Route>
        <Route exact path='/'>
          <HomePage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
