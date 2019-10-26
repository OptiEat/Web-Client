import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './components/Home/index';
//import Dashboard from './components/Dashboard/index';
import ScanPage from './components/ScanPage/index';
import ScannedList from './components/ScannedList/index';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Route exact path='/' component={Home} />
          <Route exact path='/fridge' component={Home} />
          <Route exact path='/scan' component={ScanPage} />
          <Route exact path='/scannedlist' component={ScannedList} />
      </div>
      </Router>
    </div>
  );
}
export default App;
