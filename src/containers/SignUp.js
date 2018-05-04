import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { firebaseApp } from '../firebase';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { userRef } from '../firebase';
import Error from '../components/Error';
import { saveUId } from '../lib/helpers';
import { connect } from 'react-redux';
import { checkAuthSuccess } from '../actions/index';


// injectTapEventPlugin();
class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            error: {
                message: ''
            }
        }
    }
    signUp() {
        const { email, password } = this.state;
        firebaseApp.auth().createUserWithEmailAndPassword(email, password)
            .then(userInfo => {
                const nestedRef = userRef.child(userInfo.uid + '/');
                const userData = {
                    email: userInfo.email,
                    role: this.props.match.params.role,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    phoneNumber: this.state.phoneNumber,
                }
                nestedRef.set(userData)
                    .then(result => {
                        console.log("successfully data has been saved");
                        this.props.setUser(userData);
                        saveUId(userInfo.uid);
                        this.props.history.push("/list");
                    }).catch(error => {
                        console.log("an error occured after saving data", error);
                        this.setState({ error })
                    });
            })
            .catch(error => {
                console.log("errr", error)
                this.setState({ error })
            });
    }


    render() {
        console.log(this.props)
        return (
            <MuiThemeProvider>
                <div>
                    <h1 style={{ textAlign: 'center' }}>Banquet APP</h1>
                    <div className='form-block' style={{ margin: '5%' }}>
                        <div style={{ textAlign: 'center' }}>
                            <h2>Sign Up</h2>
                        </div>
                        <Error>{this.state.error.message}</Error>
                        <div className='form-group' style={{ marginLeft: '20%', marginRight: '20%' }}>
                            <div> <input className="form-control reg-input" type="text" placeholder='email' onChange={event => this.setState({ email: event.target.value })} /></div>
                            <div> <input className="form-control reg-input" type="text" placeholder='First Name' onChange={event => this.setState({ firstName: event.target.value })} /></div>
                            <div> <input className="form-control reg-input" type="text" placeholder='Last Name' onChange={event => this.setState({ lastName: event.target.value })} /></div>
                            <div> <input className="form-control reg-input" type="text" placeholder='Phone Number' onChange={event => this.setState({ phoneNumber: event.target.value })} /></div>

                            <div><input className='form-control reg-input' type="password" placeholder='Password' onChange={event => this.setState({ password: event.target.value })} /></div>
                        </div>

                        <div style={{ marginTop: '5px', textAlign: 'center' }}>
                            <button className='btn btn-primary' type='button' onClick={() => this.signUp()}>Sign Up</button>
                        </div>
                        <div style={{ textAlign: 'center', marginTop: '5px' }}>
                            <Link to='/signin'> Already a user? Sign in instead</Link>
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        )
    }
}
function mapDispatchToProps(dispatch) {
    return ({
        setUser: (payload) => { dispatch(checkAuthSuccess(payload)) }
    })
}

export default connect(
    null,
    mapDispatchToProps
)(SignUp);

