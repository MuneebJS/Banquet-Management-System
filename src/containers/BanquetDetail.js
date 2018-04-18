import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseApp } from '../firebase.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import { Card, CardHeader, CardActions, CardMedia, CardText, CardTitle } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import { blue500 } from 'material-ui/styles/colors';
import Person from 'material-ui/svg-icons/social/person';
import Avatar from 'material-ui/Avatar';
import { NavLink } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import Logout from 'material-ui/svg-icons/action/power-settings-new';
import NMG from './NMG';
// import PB from './PB';
import Majestic from './Majestic';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { banquetRef } from '../firebase';
import * as firebase from 'firebase';

const logoutStyles = {
    marginTop: 265
};

const dividerStyle = {
    margin: 10
}


class BanquetDetail extends Component {
    constructor() {
        super();
        this.state = {
            drawerOpened: false,
            details: {},
            isError: false,
        }
        this.reserveHand = this.reserveHand.bind(this);
        this.getBanquetDetail = this.getBanquetDetail.bind(this);
    }
    componentDidMount() {
        this.getBanquetDetail();
        // const details = JSON.parse(sessionStorage.getItem('banquetDetails'));
    }
    componentWillUnmount() {
        // sessionStorage.removeItem('banquetDetails')

    }
    getBanquetDetail() {
        const banquetUID = this.props.match.params.uid;
        firebase.database().ref('Banquets/' + banquetUID).once('value').then(snapshot => {
            // console.log("result", snapshot);
            this.setState({
                details: snapshot.val(),
            })
        }).catch(error => {
            console.log("error occured", error)
            this.setState({
                isError: true,
            })
        })
    }
    reserveHand() {
        console.log("reserve clicked")
        // sessionStorage.setItem('banquetUID', this.state.details.userUID);

        this.props.history.push('/booking/' + this.state.details.userUID);
    }
    _toggleDrawer() {
        this.setState({
            drawerOpened: !this.state.drawerOpened
        });
    }
    signOut() {
        firebaseApp.auth().signOut();
    }

    render() {
        const { details } = this.state;
        if (!details) return <Loader />
        if (this.state.isError) return <Error>Something unexpected happened</Error>
        return (
            <MuiThemeProvider>
                <div>
                    <Card>
                        <CardMedia
                            overlay={<CardTitle title={details.name} subtitle={details.location} />}
                        >
                            <img
                                src="https://media.weddingz.in/images/bed39c320b1569a282d37b44f39c7f71/rajmahal-banquets-malad-west-mumbai.jpg"
                                alt=""
                                className="banquetDetailImg"
                            />
                        </CardMedia>
                        <CardTitle title={details.name} subtitle={details.location} />
                        <CardText>
                            {details.description}
                        </CardText>
                        <CardActions>
                            <FlatButton label="Reserve" primary={true} onClick={this.reserveHand} />
                            {/* <FlatButton label="Action2" /> */}
                        </CardActions>
                    </Card>
                </div>
            </MuiThemeProvider>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps, null)(BanquetDetail);
