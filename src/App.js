import React, { Component } from 'react';
import logo from './logo.svg';
import registerServiceWorker from './registerServiceWorker';
import './global.css';

import app from './containers/app.js';
import SignUp from './containers/SignUp.js';
import SignIn from './containers/SignIn.js';
// import list from './containers/BanquetList';
import { Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { Switch } from 'react-router-dom'
import { firebaseApp } from './firebase'
import reducer from './reducers'
import { logUser } from './actions'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import BanquetList from './containers/BanquetList';
import NMG from './containers/NMG';
import AddBanquet from './containers/AddBanquet';
import AdminDashboard from './containers/AdminDashboard';
import PrivateRoute from './PrivateRoute';
import thunk from 'redux-thunk'

import Majestic from './containers/Majestic';
import BanquetDetail from './containers/BanquetDetail';
import Header from './components/Header';
import BookingForm from './containers/BookingForm';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Home from './components/Home';
import throttle from 'lodash/throttle';
import { saveState, loadState } from './lib/helpers';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react'

const persistConfig = {
  key: 'user',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducer, applyMiddleware(thunk));

const history = createBrowserHistory();
// const store = createStore(reducer, applyMiddleware(thunk));
let store = createStore(persistedReducer)
let persistor = persistStore(store)

// Persist state into localstorage
// store.subscribe(throttle(() => {
//   const localState = { user: store.getState()['user'] };
//   saveState(localState);
// }, 1000));



class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <div >
              <Router history={history}>
                <Header>
                  <Switch>
                    {/* <Route exact path="/" component={Home} /> */}
                    <PrivateRoute exact path="/" role="admin"><Home /></PrivateRoute>
                    <Route exact path="/app" component={app} />
                    <Route exact path="/signin" component={SignIn} />
                    <Route exact path="/signup/:role" component={SignUp} />
                    <Route exact path="/list" component={BanquetList} />
                    <Route exact path="/NMG" component={NMG} />
                    <Route exact path="/booking/:uid" component={BookingForm} />
                    <Route exact path="/Majestic" component={Majestic} />
                    <Route exact path="/baquetDetails/:uid" component={BanquetDetail} />
                    {/* <Route exact path="/addBanquet" component={AddBanquet} /> */}
                    {/* <PrivateRoute exact path="/addBanquet" component={AddBanquet} /> */}
                    <Route exact path="/addBanquet" component={AddBanquet} />
                    <Route exact path="/banquet/dashboad" component={AdminDashboard} />
                    <Route exact={true} path="*" render={() => <h2>Page not found</h2>} />
                  </Switch>
                </Header>
              </Router>
            </div>
          </PersistGate>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
