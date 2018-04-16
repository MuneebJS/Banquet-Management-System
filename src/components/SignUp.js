import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { firebaseApp } from '../firebase';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { usersRef } from '../firebase';
// injectTapEventPlugin();
class SignUp extends Component {
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
    signUp() {
        // console.log('this.state', this.state);
        const { email, password } = this.state;
        firebaseApp.auth().createUserWithEmailAndPassword(email, password)
            .then(userInfo => {
                console.log("userInfor", userInfo.val())
            })
            .catch(error => {
                this.setState({ error })
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
                            <h2>Sign Up</h2>
                        </div>
                        <div className='form-group' style={{ marginLeft: '20%', marginRight: '20%' }}>
                            <input className="form-control" type="text" placeholder='email' onChange={event => this.setState({ email: event.target.value })} style={{ marginRight: '5px' }} />
                            <br />
                            <input className='form-control' type="password" placeholder='Password' onChange={event => this.setState({ password: event.target.value })} style={{ marginRight: '5px' }} />
                        </div>
                        <div style={{ marginTop: '5px', textAlign: 'center' }}>
                            <button className='btn btn-primary' type='button' onClick={() => this.signUp()}>Sign Up</button>
                        </div>
                        <div style={{ textAlign: 'center', marginTop: '5px' }}>
                            <Link to='/signin'> Already a user? Sign in instead</Link>
                            <br />
                            {this.state.error.message}
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default SignUp;
