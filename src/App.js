import React, { useState, createContext } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { Main } from "./views/login/main";
import { Home } from "./views/home/home";
import { ManageDetail } from "./views/api/detail/manage/manageDetail";
import './scss/main.scss'
import './scss/general.scss'
export const UserCtx = createContext(null);
function App() {
  const [userInfo, setUserInfo] = useState({});
  const forwardInfo={ userInfo: userInfo, setUserInfo: setUserInfo }
  return (
    <div className="app">
      <UserCtx.Provider
        value={forwardInfo}
      >
        <Switch>
          <Route
            path="/"
            render={props => <Main {...props} />}
            exact
          />
          <Route
            path="/home"
            render={props => <Home {...props} {...forwardInfo}/>}
          />
          <Route
            path="/api/manage"
            component={ManageDetail}
          />
        </Switch>
      </UserCtx.Provider>
    </div>
  );
}

export default App;
