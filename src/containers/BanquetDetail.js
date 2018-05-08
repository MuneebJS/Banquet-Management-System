import React, { Component } from 'react';
import moment from 'moment';
import lodash from 'lodash';
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
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';

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
            isLoading: true,
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
            console.log("result banquet details", snapshot);
            this.setState({
                details: snapshot.val(),
                isLoading: false
            })
        }).catch(error => {
            console.log("error occured", error)
            this.setState({
                isLoading: false,
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
        const { details, isLoading, isError } = this.state;
        const images = [];
        console.log("this.state", this.state)
        if (isLoading) return <Loader />
        if (isError) return <Error>Something unexpected happened</Error>
        if (details.images) {
            lodash.forEach(details.images, (item) => {
                images.push({ original: item.image, thumbnail: item.image })
            })
        }
        const from = moment(`${details.timeFrom}`, 'hh:mm A').format('hh:mm A')
        const to = moment(`${details.timeTo}`, 'hh:mm A').format('hh:mm A')
        // console.log("details",  moment(`${details.timeFrom}`, 'hh:mm A').format('hh:mm A'))
        return (
            <MuiThemeProvider>
                <div>
                    <ImageGallery
                        autoPlay={true}
                        items={images}

                    />
                    <Card>
                        <CardHeader
                            title={details.name}
                            subtitle={details.location}
                        />
                        <CardText>
                            <div
                                style={{ marginTop: 0 }}
                            ><h3>Phone</h3><div> {details.phoneNumber}</div></div>
                            <div
                                style={{ marginTop: 20 }}
                            ><h3>Description</h3><div> {details.description}</div></div>
                            <div
                                style={{ marginTop: 20 }}
                            ><h3>Price</h3><div>from <strong>{details.rangeFrom}</strong> till <strong>{details.rangeTo}</strong></div></div>
                            <div
                                style={{ marginTop: 20 }}
                            ><h3>Timings</h3><div>Open <strong>{from}</strong> till <strong>{to}</strong></div></div>
                        </CardText>
                        <CardActions>
                            <FlatButton label="Reserve" onClick={this.reserveHand} />
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
