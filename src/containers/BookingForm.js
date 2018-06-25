import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseApp, reservationRef } from '../firebase.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import { Card, CardHeader } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { blue500 } from 'material-ui/styles/colors';
import Person from 'material-ui/svg-icons/social/person';
import Avatar from 'material-ui/Avatar';
import { NavLink } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import Logout from 'material-ui/svg-icons/action/power-settings-new';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Loader from '../components/Loader';
import Title from '../components/Title';
import Error from '../components/Error';
import { getUID } from '../lib/helpers.js';
import { withRouter } from 'react-router-dom';

import ReservationDates from './ReservationDates';


const logoutStyles = {
    marginTop: 265
};

const dividerStyle = {
    margin: 10
}


class BookingForm extends Component {
    constructor() {
        super();
        this.state = {
            drawerOpened: false,
            Customer_name: '',
            Customer_address: '',
            Customer_cell: '',
            // Customer_age: '',
            Customer_email: '',
            Booking_Date: '',
            isError: false,
            typeOfEvent: '',
        }
        this.submitCustomer = this.submitCustomer.bind(this);
    }
    componentDidMount() {
        const bookingDate = new Date();
        bookingDate.setFullYear(localStorage.getItem('bookingYear'));
        bookingDate.setMonth(localStorage.getItem('bookingMonth'));
        bookingDate.setDate(localStorage.getItem('bookingDate'));
        console.log("booking", bookingDate)
        this.setState({
            Booking_Date: bookingDate
        });

        // // minDate.setHours(0, 0, 0, 0);
        // maxDate.setFullYear(maxDate.getFullYear() + 1);
        // maxDate.setHours(0, 0, 0, 0);
    }
    _toggleDrawer() {
        this.setState({
            drawerOpened: !this.state.drawerOpened
        });
    }
    submitCustomer(event) {
        event.preventDefault();
        const banquetUID = this.props.match.params.uid;
        // const banquetUID = getUID;

        const nestedRef = reservationRef.child(banquetUID + '/');
        // console.log("this.state .booking date", {
        //     customerName: this.state.Customer_name,
        //     customerAddress: this.state.Customer_address,
        //     customerCell: this.state.Customer_cell,
        //     customerEmail: this.state.Customer_email,
        //     bookingDate: this.state.Booking_Date,
        //     typeOfEvent: this.state.typeOfEvent,
        //     uid: getUID('userUID') 
        // })

        nestedRef.push({
            customerName: this.state.Customer_name,
            customerAddress: this.state.Customer_address,
            customerCell: this.state.Customer_cell,
            customerEmail: this.state.Customer_email,
            bookingDate: this.state.Booking_Date.toString(),
            typeOfEvent: this.state.typeOfEvent,
            uid: getUID('userUID')
        }).then(() => {
            console.log("successfull reserve")
            this.setState({
                isError: false
            });
            this.props.history.push("/list");
        }).catch(err => {
            console.log("err", err)
            this.setState({
                isError: true
            })
        })
    }

    render() {
        const { Customer_name } = this.state;
        const { Customer_address } = this.state;
        const { Customer_cell } = this.state;
        const { Customer_age } = this.state;
        const { Customer_email } = this.state;
        const { Booking_Date, typeOfEvent } = this.state;
        // return <ReservationDates />;
        return (
            <MuiThemeProvider>
                <div style={{ marginLeft: '20%', marginRight: '20%' }}>
                    <Title>Reservation Form</Title>
                    {this.state.isError && < Error > Something unextpedt Happened</Error>}
                    <div className="reg-input">
                        <TextField type="email" value={Customer_name} fullWidth={true} onChange={(event) => this.setState({ Customer_name: event.target.value })} hintText='Enter Full Name' floatingLabelText='Enter Full Name' />
                    </div>
                    <div className="reg-input">
                        <TextField value={Customer_address} fullWidth={true} onChange={(event) => this.setState({ Customer_address: event.target.value })} hintText='Enter Customer Address' floatingLabelText='Enter Customer Address' />
                    </div>
                    <div className="reg-input">
                        <TextField value={Customer_email} fullWidth={true} onChange={(event) => this.setState({ Customer_email: event.target.value })} hintText='Enter Customer Email' floatingLabelText='Enter Customer Email' />
                    </div>
                    <div className="reg-input">
                        <TextField value={Customer_cell} fullWidth={true} onChange={(event) => this.setState({ Customer_cell: event.target.value })} hintText='Contact No' floatingLabelText='Enter Customer Contact No' />
                    </div>
                    <div className="reg-input">
                        <TextField
                            value={typeOfEvent}
                            fullWidth={true}
                            onChange={(event) => this.setState({ typeOfEvent: event.target.value })}
                            hintText='Specify your event' floatingLabelText='Type of event' />
                    </div>
                    {/* <div className="reg-input">
                        <TextField value={Customer_age} fullWidth={true} onChange={(event) => this.setState({ Customer_age: event.target.value })} hintText='Age' floatingLabelText='Age' />
                    </div> */}
                    <div className="reg-input">
                        <DatePicker
                            floatingLabelText="Reservation Date"
                            onChange={(e, date) => this.setState({ Booking_Date: date })}
                            fullWidth={true}
                            // minDate={this.state.Booking_Date}
                            // maxDate={this.state.Booking_Date}
                            // disableYearSelection={true}
                            // disableMonthSelection={true}
                            shouldDisableDate={true}
                            value={this.state.Booking_Date}
                        // autoOk={this.state.autoOk}
                        // minDate={this.state.minDate}
                        // maxDate={this.state.maxDate}
                        // disableYearSelection={this.state.disableYearSelection}
                        />
                    </div>
                    <RaisedButton label='Submit' fullWidth={false} primary={true} style={{ marginTop: 25, marginLeft: '40%' }} onClick={this.submitCustomer} />
                </div>
            </MuiThemeProvider >
        )
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps, null)(withRouter(BookingForm));
