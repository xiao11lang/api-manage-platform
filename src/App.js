import React, { useState, createContext } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { Main } from "./views/login/main";
import { Home } from "./views/home/home";
export const UserCtx = createContext(null);
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
            render={props => <Home loginState={loginState} {...props} userInfo={userInfo}/>}
          />
        </Switch>
      </UserCtx.Provider>
    </div>
  );
}

export default App;
