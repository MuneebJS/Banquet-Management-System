import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseApp } from '../firebase.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import { Card, CardHeader } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { blue500 } from 'material-ui/styles/colors';
import Person from 'material-ui/svg-icons/social/person';
import Avatar from 'material-ui/Avatar';
import { NavLink, withRouter } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import Logout from 'material-ui/svg-icons/action/power-settings-new';
import { clearStorage } from '../lib/helpers';

const logoutStyles = {
    marginTop: 265
};

const dividerStyle = {
    margin: 10
}


class Header extends Component {
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
        firebaseApp.auth().signOut().then(result => {
            this.setState({
                drawerOpened: false,
            });
            clearStorage();
            this.props.history.push('/');
        })
    }

    render() {
        return (
            <div className="container-fluid header-wrap">
                <AppBar title='Majestic Banquet' onLeftIconButtonTouchTap={() => this._toggleDrawer()} />
                <Drawer open={this.state.drawerOpened} docked={false} onRequestChange={() => this._toggleDrawer()}>
                    <List>
                        <Card>
                            <CardHeader title="User" subtitle="User@gmail.com" />
                        </Card>
                        <br />
                        <Divider style={dividerStyle} />
                        <ListItem leftAvatar={<Avatar icon={<Person />} backgroundColor={blue500} />}>
                            <NavLink to="/list">List of Banquets</NavLink>
                        </ListItem>
                        <br />
                        <FlatButton style={logoutStyles} icon={<Logout />} label="Signout" fullWidth={true} onTouchTap={() => this.signOut()} />
                    </List>
                </Drawer>
                <div className="innerWrap container">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default withRouter(Header);


