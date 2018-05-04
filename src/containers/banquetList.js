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
import FlatButton from 'material-ui/FlatButton';
import Logout from 'material-ui/svg-icons/action/power-settings-new';
import NMG from './NMG';
import { getUID } from '../lib/helpers';
// import PB from './PB';
import Majestic from './Majestic';
import { banquetRef } from '../firebase';
import Loader from '../components/Loader';
import ListingCard from '../components/ListingCard';


const logoutStyles = {
    marginTop: 265
};

const dividerStyle = {
    margin: 10
}


class list extends Component {
    constructor() {
        super();
        this.state = {
            drawerOpened: false,
            banquets: null,
        }
        this.getBanquets = this.getBanquets.bind(this);
        this.cardClick = this.cardClick.bind(this);
    }
    componentDidMount() {
        sessionStorage.removeItem('banquetDetails');
        this.getBanquets()
    }
    cardClick(ban) {
        sessionStorage.setItem("banquetDetails", JSON.stringify(ban));
        const uid = ban.userUID;
        if (uid) {
            this.props.history.push('/baquetDetails/' + uid);
        }
    }
    getBanquets() {
        const _this = this;
        banquetRef.on('value', function (snapshot) {
            const banquets = snapshot.val();
            const customBanArr = [];
            for (var key in banquets) {
                customBanArr.push(banquets[key]);
            }
            _this.setState({
                banquets: customBanArr,
            })
        })
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
        // console.log("this.state", this.state)
        const data = [
            {
                name: "dummy4",
            },
            {
                name: "dummy3",
            },
            {
                name: "dummy2",
            },
        ]
        if (!this.state.banquets) return <Loader />
        return (
            <MuiThemeProvider>
                <div>
                    {this.state.banquets.map((ban, i) => {
                        return (
                            <Card style={{ marginTop: '10%' }} onClick={() => this.cardClick(ban)}>
                                <CardHeader title={ban.name} />
                                <ListItem>
                                    {ban.name}
                                </ListItem>
                            </Card>
                            // <ListingCard key={i} name={ban.name} />
                        )
                    })}
                </div>
            </MuiThemeProvider>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps, null)(list);
