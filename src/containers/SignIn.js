import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { firebaseApp } from '../firebase';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { userRef } from '../firebase';
import * as firebase from 'firebase';
import Title from '../components/Title';
import { saveUId } from '../lib/helpers';
import Error from '../components/Error';

injectTapEventPlugin();

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isLoading: false,
            error: {
                message: ''
            }
        }
        this.signIn = this.signIn.bind(this);
    }
    signIn() {
        const { email, password } = this.state;
        // console.log("this.props", this.props)
        this.setState({
            isLoading: true,
        })
        const _this = this;
        firebaseApp.auth().signInWithEmailAndPassword(email, password)
            .then(userInfo => {
                console.log("user ifo signin", userInfo.uid);
                firebase.database().ref('Users/' + userInfo.uid).once('value')
                    .then(function (snapshot) {
                        saveUId(userInfo.uid);
                        _this.props.history.push("/list");
                    }).catch(error => {
                        this.setState({ error, isLoading: false })
                    })
            })
            .catch(error => {
                console.log("error from signin", error);
                this.setState({ error, isLoading: false });
            })
    }
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <div className='form-block' style={{ margin: '5%' }}>
                        <Title>Sign In</Title>
                        <div style={{ marginLeft: '20%' }}><Error>{this.state.error.message}</Error></div>
                        <div className='form-group' style={{ marginLeft: '20%', marginRight: '20%' }}>
                            <input className="form-control" type="text" placeholder='email' onChange={event => this.setState({ email: event.target.value })} style={{ marginRight: '5px' }} />
                            <br />
                            <input className='form-control' type="password" placeholder='Password' onChange={event => this.setState({ password: event.target.value })} style={{ marginRight: '5px' }} />
                        </div>
                        <div style={{ marginTop: '5px', textAlign: 'center' }}>
                            <button className='btn btn-primary' type='button' onClick={this.signIn}>
                                {this.state.isLoading ? 'Signing In' : 'Sign In'}
                            </button>
                        </div>
                        <div style={{ textAlign: 'center', marginTop: '5px' }}>
                            <Link to='/signup'> Not registered ? Sign up instead</Link>
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default withRouter(SignIn);
