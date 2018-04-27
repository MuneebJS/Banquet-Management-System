import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseApp } from '../firebase.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import { Card, CardHeader } from 'material-ui/Card';
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
// import PB from './PB';
import Majestic from './Majestic';
import { reservationRef } from '../firebase';
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
        }
        this.getBanquets = this.getBanquets.bind(this);
        this.acceptHand = this.acceptHand.bind(this);
    }
    componentDidMount() {
        this.getBanquets()
    }

    acceptHand(ban) {
        sessionStorage.setItem("banquetDetails", JSON.stringify(ban));
        const uid = ban.userUID;
        if (uid) {
            this.props.history.push('/baquetDetails/' + uid);
        }
    }
    getBanquets() {
        // const _this = this;
        // firebase.database().ref('ReservationRequests/' + banquetUID).on('value')
        const banquetUID = getUID('userUID')
        firebase.database().ref('ReservationRequests/' + banquetUID).on('value', (snapshot) => {
            const requests = snapshot.val();
            const customBanArr = [];
            for (var key in requests) {
                customBanArr.push(requests[key]);
            }
            console.log("customBanArr", customBanArr)
            this.setState({
                requests: customBanArr,
                isLoading: false,
            })
        })
    }

    render() {
        // console.log("this.state", this.state)

        if (this.state.isLoading) return <Loader />
        return (
            <MuiThemeProvider>
                <div>
                    {this.state.requests.map((item, i) => {
                        return (
                            <Card style={{ marginTop: '10%' }}>
                                <CardHeader title={item.customerName} />
                                <ListItem>
                                    {item.customerEmail}
                                </ListItem>
                                <FlatButton label="Accept" primary={true} onClick={() => this.acceptHand(item)} />
                            </Card>
                        )
                    })}
                </div>
            </MuiThemeProvider>
        )
    }
}


