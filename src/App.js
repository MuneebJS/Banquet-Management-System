import React, { Component } from 'react';
import './global.css';
import Routes from './Routes'
import { Router, Route, BrowserRouter } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { Provider, connect } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers'
import thunk from 'redux-thunk'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
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
            <BrowserRouter >
              {/* <Header>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/app" component={app} />
                  <Route path="/signin" component={SignIn} />
                  <Route path="/signup/:role" component={SignUp} />
                  <Route path="/list" component={BanquetList} />
                  <Route path="/NMG" component={NMG} />
                  <Route path="/booking/:uid" component={BookingForm} />
                  <Route path="/Majestic" component={Majestic} />
                  <Route path="/baquetDetails/:uid" component={BanquetDetail} />
                  <Route path="/addBanquet" component={AddBanquet} />
                  <Route path="/banquet/dashboad" component={AdminDashboard} />
                  <Route path="*" render={() => <h2>Page not found</h2>} />
                </Switch>
              </Header> */}
              <Routes />
            </BrowserRouter>
          </PersistGate>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

// export default withRouter(App);
export default App;