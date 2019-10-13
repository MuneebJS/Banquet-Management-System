import React, { Component } from 'react';
import './global.css';

import app from './containers/app.js';
import SignUp from './containers/SignUp.js';
import SignIn from './containers/SignIn.js';
import { Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { createStore, applyMiddleware } from 'redux'
import { Switch, withRouter } from 'react-router-dom';
import reducer from './reducers'
import BanquetList from './containers/banquetList';
import NMG from './containers/NMG';
import AddBanquet from './containers/AddBanquet';
import AdminDashboard from './containers/AdminDashboard';
import UserDashboard from './containers/UserDashboard';
import PrivateRoute from './PrivateRoute';
import thunk from 'redux-thunk'

import Majestic from './containers/majestic';
import BanquetDetail from './containers/BanquetDetail';
import BookingForm from './containers/BookingForm';
import Home from './components/Home';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import Layout from './Layout';
import AboutUs from './components/AboutUs';
import UpdateBanquet from './containers/UpdateBanquet';
import ReservationDates from './containers/ReservationDates';


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



class Routes extends Component {
	render() {
		return (
			<div>
				<Layout>
					<Switch>
						<Route exact path="/" component={Home} />
						<PrivateRoute exact path="/" role="admin"><Home /></PrivateRoute>
						<Route exact path="/app" component={app} />
						<Route path="/signin" component={SignIn} />
						<Route path="/signup/:role" component={SignUp} />
						<Route path="/list" component={BanquetList} />
						<Route path="/NMG" component={NMG} />
						{/* <PrivateRoute exact path="/booking/:uid" role="user"> <BookingForm /> </PrivateRoute> */}
						<Route exact path="/booking/:uid" component={BookingForm} />
						<Route exact path="/bookingDates/:uid" component={ReservationDates} />
						<Route path="/Majestic" component={Majestic} />
						<Route path="/baquetDetails/:uid" component={BanquetDetail} />
						<PrivateRoute path="/addBanquet" role="admin"> <AddBanquet /></PrivateRoute>
						<PrivateRoute path="/banquet/dashboad" role="admin"><AdminDashboard /></PrivateRoute>
						<PrivateRoute path="/user/dashboad" role="user"><UserDashboard /></PrivateRoute>
						<PrivateRoute path="/banquet/update" role="admin"> <UpdateBanquet /></PrivateRoute>
						<Route path="/aboutUs" component={AboutUs} />
						<Route path="*" render={() => <h2>Page not found</h2>} />
					</Switch>
				</Layout>

			</div>
		);
	}
}

// export default withRouter(App);
export default withRouter(Routes);