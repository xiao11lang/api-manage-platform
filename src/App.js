import React from 'react';
import './App.css';
import {Switch,Route} from 'react-router-dom'
import {Main} from './views/login/main'
import {Home} from './views/home/home'
function App() {
  return (
    <div className="app">
      <Switch>
        <Route path='/' component={Main} exact></Route>
        <Route path='/home' component={Home}></Route>
      </Switch>
      
    </div>
  );
}

export default App;
