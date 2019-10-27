import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Home from './components/Home/index';
//import Dashboard from './components/Dashboard/index';
import ScanPage from './components/ScanPage/index';
import ScannedList from './components/ScannedList/index';
import Plan from './components/Plan/index';
import Fridge from './components/Fridge/index';

function App() {
  const [foods, setFoods] = useState();
  const [scannedFoods, setScannedFoods] = useState();

  const [autoRun, setAutoRun] = useState(false);
  const handleFoodPass = (foods) => {
  }
  return (
    <div className="App">
      <Router>
        <div>
        {foods ? <Redirect to='/scannedlist' setScannedFoods={setScannedFoods}/> : ""}
        {scannedFoods ? <Redirect to='/plan'/> : ""}
          <Route exact path='/' component={Home} />
          <Route exact path='/fridge' component={Fridge} />
          <Route exact path='/scan' render={() => <ScanPage setFoods={setFoods}/>} />
          <Route exact path='/scannedlist' render={() => <ScannedList foods={foods} setScannedFoods={setScannedFoods} setAutoRun={setAutoRun}/>} />
          <Route exact path='/plan' render={() => <Plan scannedFoods={scannedFoods} autoRun={autoRun}/>} />
      </div>
      </Router>
    </div>
  );
}
export default App;
