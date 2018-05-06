import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseApp } from '../firebase.js';
import moment from 'moment';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import { blue500 } from 'material-ui/styles/colors';
import Person from 'material-ui/svg-icons/social/person';
import Avatar from 'material-ui/Avatar';
import { NavLink } from 'react-router-dom';
import Logout from 'material-ui/svg-icons/action/power-settings-new';
import NMG from './NMG';
import { getUID } from '../lib/helpers';
import Majestic from './Majestic';
import { acceptedRef, reservationRef } from '../firebase';
import FlatButton from 'material-ui/FlatButton';
import Loader from '../components/Loader';
import * as firebase from 'firebase';



const logoutStyles = {
    marginTop: 265
};

const dividerStyle = {
    margin: 10
}


export default class ReservationRequests extends Component {
    constructor() {
        super();
        this.state = {
            requests: [],
            isLoading: true,
            error: false,
            isAccepting: false
        }
        this.getBanquets = this.getBanquets.bind(this);
        this.acceptHand = this.acceptHand.bind(this);
        this.rejectHand = this.rejectHand.bind(this);
    }
    componentDidMount() {
        this.getBanquets()
    }

    acceptHand(ban) {
        this.setState({
            isAccepting: true,
        })
        const banquetUID = getUID('userUID');
        const nestedRef = acceptedRef.child(banquetUID + '/');
        nestedRef.push(ban).then(() => {
            console.log("successfull accepted")
            const resNestedRef = reservationRef.child(`${banquetUID}/${ban.key}`)
            resNestedRef.remove().then(() => {
                this.setState({
                    isError: false,
                    isAccepting: false,
                });
            }).catch(err => {
                this.setState({
                    isError: true
                })
            })
        })
    }


    rejectHand(ban) {
        this.setState({
            isAccepting: true,
        })
        const banquetUID = getUID('userUID');
        // const nestedRef = acceptedRef.child(banquetUID + '/');
        // nestedRef.push(ban).then(() => {
        // console.log("successfull reject")
        const resNestedRef = reservationRef.child(`${banquetUID}/${ban.key}`)
        resNestedRef.remove().then(() => {
            this.setState({
                isError: false,
                isAccepting: false,
            });
        }).catch(err => {
            // console.log("err", err)
            this.setState({
                isError: true
            })
        })
        // })
    }
    getBanquets() {
        const banquetUID = getUID('userUID')
        firebase.database().ref('ReservationRequests/' + banquetUID).on('value', (snapshot) => {
            const requests = snapshot.val();
            const customBanArr = [];
            for (var prop in requests) {
                // skip loop if the property is from prototype
                if (!requests.hasOwnProperty(prop)) continue;
                let reqData = requests[prop];
                reqData.key = prop;
                customBanArr.push(reqData)
            }
            this.setState({
                requests: customBanArr,
                isLoading: false,
            })
        })
    }

    render() {
        // console.log("this.state", this.state)
        const { isAccepting } = this.state;
        if (this.state.isLoading) return <Loader />
        return (
            <MuiThemeProvider>
                <div>
                    {this.state.requests.map((item, i) => {
                        const date = moment(item.bookingDate).format('dddd, MMMM Do YYYY');
                        return (
                            <Card style={{ marginTop: 40 }}>
                                <CardHeader
                                    title={item.customerName}
                                    subtitle={date}
                                />
                                <CardText>
                                    <div
                                        style={{ marginTop: 0 }}
                                    ><h3>Name</h3><div> {item.customerName}</div></div>
                                    <div
                                        style={{ marginTop: 20 }}
                                    ><h3>Email</h3><div> {item.customerEmail}</div></div>
                                    <div
                                        style={{ marginTop: 20 }}
                                    ><h3>Phone</h3><div> {item.customerCell}</div></div>
                                    <div
                                        style={{ marginTop: 20 }}
                                    ><h3>Address</h3><div> {item.customerAddress}</div></div>
                                </CardText>
                                <FlatButton label={isAccepting ? 'Accepting' : 'Accept'}
                                    primary={true} onClick={() => this.acceptHand(item)} />
                                <FlatButton label={isAccepting ? 'Rejecting' : 'Reject'}
                                    filled={true} secondary={true} onClick={() => this.rejectHand(item)} />
                            </Card>
                        )
                    })}
                </div>
            </MuiThemeProvider>
        )
    }
}


