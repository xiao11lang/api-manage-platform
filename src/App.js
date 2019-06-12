import React, { useState, createContext } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { Main } from "./views/login/main";
import { Home } from "./views/home/home";
export const UserCtx = createContext(null);
function useUserInfo(initial){
  const [userInfo, setInfo] = useState(initial);
  const setUserInfo=(info)=>{
    setInfo(Object.assign({},userInfo,info))
  }
  return [userInfo,setUserInfo]
}
function App() {
  const [loginState, setLoginState] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  return (
    <div className="app">
      <UserCtx.Provider
        value={{ userInfo: userInfo, setUserInfo: setUserInfo }}
      >
        <Switch>
          <Route
            path="/"
            render={props => <Main setLoginState={setLoginState} {...props} />}
            exact
          />
          <Route
            path="/home"
            render={props => <Home loginState={loginState} {...props} />}
          />
        </Switch>
      </UserCtx.Provider>
    </div>
  );
}

export default App;
