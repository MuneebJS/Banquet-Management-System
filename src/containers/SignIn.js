import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { firebaseApp } from '../firebase';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { userRef } from '../firebase';
import * as firebase from 'firebase';

injectTapEventPlugin();

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: {
                message: ''
            }
        }
    }
    signIn() {
        const { email, password } = this.state;
        firebaseApp.auth().signInWithEmailAndPassword(email, password)
            .then(userInfo => {
                console.log("user ifo signin", userInfo.uid);
                firebase.database().ref('Users/' + userInfo.uid).once('value')
                    .then(function(snapshot) {
                        console.log("get data sigin result", snapshot.val())
                    }).catch(error => {
                        console.log("error in get data", error)
                    })
                // firebase.database().ref('/users/' + userId).once('value')
            })
            .catch(error => {
                console.log("error from signin", error);
                this.setState({ error });
            })
    }
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <AppBar title='Welcome to Banquet Booking App' style={{ marginLeft: '-12%', width: '123.5%' }} />
                    <h1 style={{ textAlign: 'center' }}>Banquet APP</h1>
                    <div className='form-block' style={{ margin: '5%' }}>
                        <div style={{ textAlign: 'center' }}>
                            <h2>Sign In</h2>
                        </div>
                        <div className='form-group' style={{ marginLeft: '20%', marginRight: '20%' }}>
                            <input className="form-control" type="text" placeholder='email' onChange={event => this.setState({ email: event.target.value })} style={{ marginRight: '5px' }} />
                            <br />
                            <input className='form-control' type="password" placeholder='Password' onChange={event => this.setState({ password: event.target.value })} style={{ marginRight: '5px' }} />
                        </div>
                        <div style={{ marginTop: '5px', textAlign: 'center' }}>
                            <button className='btn btn-primary' type='button' onClick={() => this.signIn()}>Sign In</button>
                        </div>
                        <div style={{ textAlign: 'center', marginTop: '5px' }}>
                            <Link to='/signup'> Not registered ? Sign up instead</Link>
                            <br />
                            {this.state.error.message}
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default SignIn;
