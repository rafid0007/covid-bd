import React, { createContext, useState } from 'react';
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

// library imports
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from 'react-plotly.js/factory';
// import Plot from 'react-plotly.js';

// custom component imports
import TopBar from './Components/topBar/topBar';
import { HomePage } from './Pages/HomePage';
import AboutPage from './Pages/AboutPage/AboutPage';

// style imports
import './App.css';

export const DistrictDataContext = createContext();


// const Plotly = window.Plotly;
const Plot = createPlotlyComponent(Plotly);

function App() {
  const [districtData, setDistrictData] = useState({});
  return (
    <DistrictDataContext.Provider value={[districtData, setDistrictData]}>
      <Router>
        <TopBar />
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route path='/home'>
            <HomePage />
          </Route>
          <Route path='/about'>
            <AboutPage></AboutPage>
          </Route>
        </Switch>
      </Router>
    </DistrictDataContext.Provider>
  );
}

export default App;
