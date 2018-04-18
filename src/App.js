import React, { Component } from 'react';
import logo from './logo.svg';
import registerServiceWorker from './registerServiceWorker';
import './global.css';

import app from './containers/app.js';
import SignUp from './containers/SignUp.js';
import SignIn from './containers/SignIn.js';
import list from './containers/banquetList';
import { Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { firebaseApp } from './firebase'
import reducer from './reducers'
import { logUser } from './actions'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import banquetList from './containers/banquetList';
import NMG from './containers/NMG';
// import PB from './containers/PB';
import Majestic from './containers/majestic';
import majestic from './containers/majestic';
import BanquetDetail from './containers/BanquetDetail';
import Header from './components/Header';
import BookingForm from './containers/BookingForm';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const history = createBrowserHistory();
const store = createStore(reducer);

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Provider store={store}>
          <div >
            <Router path="/" history={history}>
              <Header>
                <Route path="/app" component={app} />
                <Route path="/signin" component={SignIn} />
                <Route path="/signup/:role" component={SignUp} />
                <Route path="/list" component={banquetList} />
                <Route path="/NMG" component={NMG} />
                <Route path="/booking" component={BookingForm} />
                <Route path="/Majestic" component={majestic} />
                <Route path="/baquet/details" component={BanquetDetail} />
              </Header>
            </Router>
          </div>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
