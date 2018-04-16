import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseApp } from '../firebase.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import {Card, CardHeader } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import { blue500 } from 'material-ui/styles/colors';
import Person from 'material-ui/svg-icons/social/person';
import Avatar from 'material-ui/Avatar';
import { NavLink, Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import Logout from 'material-ui/svg-icons/action/power-settings-new';
import list from './banquetList';

const logoutStyles = {
    marginTop: 265
};

const dividerStyle = {
    margin: 10
}


class app extends Component{
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
    signOut(){
        firebaseApp.auth().signOut();
    }
    
    render(){
        return (
            <MuiThemeProvider>
                <div>
                <AppBar title='Welcome to Banquet App'  onLeftIconButtonTouchTap={() => this._toggleDrawer()} style={{marginLeft: '-12%', width: '123.5%'}} />
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
                                    <FlatButton style={logoutStyles} icon={<Logout />} label="Signout" fullWidth={true} onTouchTap={ () => this.signOut()} />                
                        </List>
                    </Drawer>
                </div>
            </MuiThemeProvider>
        )
    }
}

function mapStateToProps(state){
    return {}
}

export default connect(mapStateToProps, null) (app);
