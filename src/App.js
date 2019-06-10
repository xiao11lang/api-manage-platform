import React,{useState} from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { Main } from "./views/login/main";
import { Home } from "./views/home/home";
function App() {
  const [loginState,setLoginState]=useState(false)
  return (
    <div className="app">
      <Switch>
        <Route path="/" render={(props)=><Main setLoginState={setLoginState} {...props}/>} exact />
        <Route path="/home" render={(props)=><Home loginState={loginState} {...props}/>} />
      </Switch>
    </div>
  );
}

export default App;
