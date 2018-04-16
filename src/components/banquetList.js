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
// import PB from './PB';
import Majestic from './majestic';


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
            drawerOpened: false
        }
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
        return (
            <MuiThemeProvider>
                <div>
                    <Card style={{ marginTop: '10%' }}>
                        <CardHeader title="North marriege Lawn" />
                        <ListItem>
                            <NavLink to="/booking">North Marrige Lawn</NavLink>
                        </ListItem>
                    </Card>
                    <Card style={{ marginTop: '5%' }}>
                        <CardHeader title="Pearl Banquet" />
                        <ListItem>
                            <NavLink to="/booking">Pearl Banquet</NavLink>
                        </ListItem>
                    </Card>
                    <Card style={{ marginTop: '5%' }}>
                        <CardHeader title="Pearl Banquet" />
                        <ListItem>
                            <NavLink to="/Majestic">Majestic Banquet</NavLink>
                        </ListItem>
                    </Card>
                </div>
            </MuiThemeProvider>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps, null)(list);
