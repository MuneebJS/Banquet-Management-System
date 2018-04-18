import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { firebaseApp } from '../firebase';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TimePicker from 'material-ui/TimePicker';
import AppBar from 'material-ui/AppBar';
import { banquetRef } from '../firebase';
import Error from '../components/Error';
import Title from '../components/Title';
import { getUID } from '../lib/helpers';


// injectTapEventPlugin();
class AddBanquet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            location: '',
            timeTo: '',
            timeFrom: '',
            description: '',
            phoneNumber: '',
            email: '',
            isLoading: '',
            error: {
                message: ''
            }
        }
        this.saveHandler = this.saveHandler.bind(this);
    }
    saveHandler() {
        const { name, description, location, timeTo, timeFrom, phoneNumber, email } = this.state;
        this.setState({
            isLoading: true,
        })
        const userUID = getUID('userUID');
        const nestedRef = banquetRef.child(userUID + '/');
        nestedRef.set({
            name: name,
            description: description,
            location: location,
            phoneNumber: phoneNumber,
            timeTo: JSON.stringify(timeTo),
            timeFrom: JSON.stringify(timeFrom),
            userUID: userUID,
        })
            .then(result => {
                this.props.history.push('/')
            }).catch(error => {
                this.setState({
                    error
                })
                console.log("error occured in saving", error);
            })
    }


    render() {
        return (
            <MuiThemeProvider>
                <div>

                    <div className='form-block'>
                        <Title>Add Banquet</Title>
                        <Error>{this.state.error.message}</Error>
                        <div className='form-group' style={{ marginLeft: '20%', marginRight: '20%' }}>
                            <div> <input className="form-control reg-input" type="text" placeholder='Name' onChange={event => this.setState({ name: event.target.value })} /></div>
                            <div> <input className="form-control reg-input" type="text" placeholder='Description' onChange={event => this.setState({ description: event.target.value })} /></div>
                            <div> <input className="form-control reg-input" type="text" placeholder='Location' onChange={event => this.setState({ location: event.target.value })} /></div>
                            <div>
                                <TimePicker
                                    format="ampm"
                                    hintText="To"
                                    value={this.state.timeTo}
                                    onChange={(e, date) => this.setState({ timeTo: date })}
                                />
                                <TimePicker
                                    format="ampm"
                                    hintText="From"
                                    value={this.state.timeFrom}
                                    onChange={(e, date) => this.setState({ timeFrom: date })}
                                />
                            </div>
                            <div> <input className="form-control reg-input" type="text" placeholder='Phone Number' onChange={event => this.setState({ phoneNumber: event.target.value })} /></div>
                            <div><input className='form-control reg-input' type="email" placeholder='Email' onChange={event => this.setState({ email: event.target.value })} /></div>
                        </div>

                        <div style={{ marginTop: '5px', textAlign: 'center' }}>
                            <button className='btn btn-primary' type='button' onClick={this.saveHandler}>{this.state.isLoading ? "Saving" : "Save"}</button>
                        </div>
                        <Error />
                    </div>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default AddBanquet;
