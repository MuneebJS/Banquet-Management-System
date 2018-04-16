import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseApp, customerInfo } from '../firebase.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import {Card, CardHeader } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { blue500 } from 'material-ui/styles/colors';
import Person from 'material-ui/svg-icons/social/person';
import Avatar from 'material-ui/Avatar';
import { NavLink, Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import Logout from 'material-ui/svg-icons/action/power-settings-new';
import list from './banquetList';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const logoutStyles = {
    marginTop: 265
};

const dividerStyle = {
    margin: 10
}


class NMG extends Component{
    constructor() {
        super();
        this.state = {
            drawerOpened: false,
            Customer_name: '',
            Customer_address: '',
            Customer_cell: '',
            Customer_age: '',
            Customer_email: '',
            Booking_Date: ''
        }
        this.submitCustomer = this.submitCustomer.bind(this);
    }
    _toggleDrawer() {
        this.setState({
            drawerOpened: !this.state.drawerOpened
        });
    }
    submitCustomer(event) {
        event.preventDefault();
        // alert('You Submit New Patient Data');
        this.pref = customerInfo.child(this.state.Customer_name + '/');
        this.pref.set({ Customer_name: this.state.Customer_name,
                        Customer_address: this.state.Customer_address,
                        Customer_cell: this.state.Customer_cell,
                        Customer_email: this.state.Customer_email,
                        Customer_age: this.state.Customer_age,
                        Booking_Date: this.state.Booking_Date
                        });
}
    signOut(){
        firebaseApp.auth().signOut();
    }
    
    render(){
        const { Customer_name } = this.state;
        const { Customer_address } = this.state;
        const { Customer_cell } = this.state;
        const { Customer_age } = this.state;
        const { Customer_email } = this.state;
        const { Booking_Date } = this.state;
        return (
            <MuiThemeProvider>
                <div>
                <AppBar title='Welcome to North marrige Lawn'  onLeftIconButtonTouchTap={() => this._toggleDrawer()} style={{marginLeft: '-12%', width: '123.5%'}} />
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
                    <div>
                        <h2>Booking Form</h2>
                            <div style={{width: '60%', marginLeft: 20}}>
                                <TextField value={ Customer_name } style={{marginTop: -25}} fullWidth={true} onChange={(event) => this.setState({ Customer_name: event.target.value })} hintText='Enter Full Name' floatingLabelText='Enter Full Name'/>
                            </div>
                            <div style={{width: '60%', marginLeft: 20}}>
                                <TextField value={ Customer_address } style={{marginTop: -25}} fullWidth={true} onChange={(event) => this.setState({ Customer_address: event.target.value })} hintText='Enter Customer Address' floatingLabelText='Enter Customer Address'/>
                            </div>
                            <div style={{width: '60%', marginLeft: 20}}>
                                <TextField value={ Customer_email } style={{marginTop: -25}} fullWidth={true} onChange={(event) => this.setState({ Customer_email: event.target.value })} hintText='Enter Customer Email' floatingLabelText='Enter Customer Email'/>
                            </div>
                            <div style={{width: '60%', marginLeft: 20}}>
                                <TextField value={ Customer_cell } style={{marginTop: -25}} fullWidth={true} onChange={(event) => this.setState({ Customer_cell: event.target.value })} hintText='Contact No' floatingLabelText='Enter Customer Contact No'/>
                            </div>
                            <div style={{width: '60%', marginLeft: 20}}>
                                <TextField value={ Customer_age } style={{marginTop: -25}} fullWidth={true} onChange={ (event) => this.setState({ Customer_age: event.target.value }) } hintText='Age' floatingLabelText='Age'/>
                            </div>
                            <div style={{width: '60%', marginLeft: 20}}>
                                <label>
                                    Booking Date: 
                                    <input style={{width: 300}} type="date" value={ Booking_Date } onChange={(event) => this.setState({ Booking_Date : event.target.value})} />
                                </label>
                            </div>
                            <RaisedButton label='Submit' fullWidth={false} primary={true} style={{ marginTop: 25, marginLeft: '40%'}} onClick={this.submitCustomer}/>
                    </div>
                </div>
            </MuiThemeProvider>
        )
    }
}

function mapStateToProps(state){
    return {}
}

export default connect(mapStateToProps, null) (NMG);
