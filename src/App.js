import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useReducer, useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import "./App.css";
import 'react-toastify/dist/ReactToastify.css';
import Notify from './services/notify';
import {  ThemeProvider } from '@material-ui/core/styles';
import {theme} from './utils/theme';
import Login from './components/login';
import signup from './components/register';
import { stateContext } from './context';
import { initialState, stateReducer } from './context/reducer';
import Dashboard from './components/dashboard';
import Orders from './components/orders';
import { makeStyles } from "@material-ui/core/styles";

function App() {
  const [state, dispatch] = useReducer(stateReducer, initialState);
  useEffect(() => {
    Notify.notifications.subscribe((alert) => alert instanceof Function && alert());
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <stateContext.Provider value={{state:state,dispatch:dispatch}}>
      <Router>
      {state.isAuthenticated?(
        <div className="container">
            <Switch>
              <Route exact path="/" component={Dashboard} />
             <Route exact path="/orders" component={Orders} />
             <Route exact path="*" component={Dashboard} />
            </Switch>
        </div>
        ):(
          <Switch>
              <Route path="/login" component={Login} />
              <Route path="/signup" component={signup} />
              <Route path="*" component={Login} />
          </Switch>
       )}
      </Router>
      <ToastContainer autoClose={5000} />
      <Backdrop style={{zIndex:'10 !important'}} open={state.isLoading}>
                  <CircularProgress color="inherit" />
      </Backdrop>
      </stateContext.Provider>
    </ThemeProvider>
  );
}

export default App;