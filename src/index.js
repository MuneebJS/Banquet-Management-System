import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './App';


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
    <App />,
    document.getElementById('root')
);
registerServiceWorker();
