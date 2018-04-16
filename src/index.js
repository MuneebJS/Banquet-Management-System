import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
// import './index.css';
// import './global.css';
// import app from './components/app.js';
// import SignUp from './components/SignUp.js';
// import SignIn from './components/SignIn.js';
// import list from './components/banquetList';
// import { Router, Route } from 'react-router-dom';
// import createBrowserHistory from 'history/createBrowserHistory';
// import { Provider } from 'react-redux'
// import { createStore } from 'redux'
// import { firebaseApp } from './firebase'
// import reducer from './reducers'
// import { logUser } from './actions'
// import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
// import banquetList from './components/banquetList';
// import NMG from './components/NMG';
// import PB from './components/PB';
// import Majestic from './components/majestic';
// import majestic from './components/majestic';
// import BanquetDetail from './components/BanquetDetail';


// firebaseApp.auth().onAuthStateChanged(user => {
//     if(user) {
//         // console.log('User has signed in or up', user);
//         const { email } = user;
//         store.dispatch(logUser(email))
//         history.push('/app');
//     } else {
//         // console.log('User has signed out or still need to sign in.')
//         history.replace('/signin');
//     }
// })




// const history = createBrowserHistory();
// const store = createStore(reducer);

ReactDOM.render(
    // <Provider store={store}>
    //     <Router path="/" history={history}>
    //         <div className='container'>
    //             <Route path="/app" component={app} />
    //             <Route path="/signin" component={SignIn} />
    //             <Route path="/signup" component={SignUp} />
    //             <Route path="/list" component={banquetList} />
    //             <Route path="/NMG" component={NMG} />
    //             <Route path="/PB" component={PB} />
    //             <Route path="/Majestic" component={majestic} />
    //             <Route path="/baquet/details" component={BanquetDetail} />
    //         </div>
    //     </Router>
    // </Provider>,
    <App />,
    document.getElementById('root')
);
registerServiceWorker();
