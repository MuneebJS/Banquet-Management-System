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
import { acceptedRef } from '../firebase';
import FlatButton from 'material-ui/FlatButton';
import Loader from '../components/Loader';
import * as firebase from 'firebase';



const logoutStyles = {
    marginTop: 265
};

const dividerStyle = {
    margin: 10
}


export default class AcceptedRequests extends Component {
    constructor() {
        super();
        this.state = {
            requests: [],
            isLoading: true,
            error: false,
            isAccepting: false
        }
        this.getBanquets = this.getBanquets.bind(this);
        // this.acceptHand = this.acceptHand.bind(this);
        this.removeHand = this.removeHand.bind(this);
    }
    componentDidMount() {
        this.getBanquets()
    }


    removeHand(ban) {
        this.setState({
            isAccepting: true,
        })
        const userUID = getUID('userUID');
        const resNestedRef = acceptedRef.child(`${userUID}/${ban.key}`)
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
        const userUID = getUID('userUID')
        firebase.database().ref('CustomerAcceptedRequests/' + userUID).on('value', (snapshot) => {
            const requests = snapshot.val();
            const customBanArr = [];
            for (var prop in requests) {
                // skip loop if the property is from prototype
                if (!requests.hasOwnProperty(prop)) continue;
                let reqData = requests[prop];
                reqData.key = prop;

                firebase.database().ref('Banquets/' + reqData.uid).once('value').then((banquetData) => {
                    reqData.banquetInfo = banquetData.val();
                    customBanArr.push(reqData)
                    this.setState({
                        requests: customBanArr,
                        isLoading: false,
                    })
                })
            }

        })
    }

    render() {
        // console.log("this.state", this.state)
        const { isAccepting } = this.state;
        if (this.state.isLoading) return <Loader />
        console.log("this state requests", this.state.requests);
        return (
            <MuiThemeProvider>
                <div>
                    {this.state.requests.map((item, i) => {
                        const date = moment(item.bookingDate).format('dddd, MMMM Do YYYY');
                        return (
                            <Card style={{ marginTop: 40 }}>
                                <CardHeader
                                    title={item.banquetInfo.name}
                                    subtitle={item.banquetInfo.location}
                                />
                                <CardText>
                                   <h2> Congratulations! Your reservation request is being accepted.</h2>
                    
                                    <div
                                        style={{ marginTop: 0 }}
                                    ><h3>Phone</h3><div> {item.banquetInfo.phoneNumber}</div></div>
                                    <div
                                        style={{ marginTop: 20 }}
                                    ><h3>Email</h3><div> {item.banquetInfo.email}</div></div> 
                                </CardText>
                            </Card>
                        )
                    })}
                </div>
            </MuiThemeProvider>
        )
    }
}


