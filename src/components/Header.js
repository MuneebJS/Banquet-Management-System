import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseApp } from '../firebase.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import { Card, CardHeader } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import DatePicker from 'material-ui/DatePicker';
import { blue500 } from 'material-ui/styles/colors';
import Person from 'material-ui/svg-icons/social/person';
import Avatar from 'material-ui/Avatar';
import { NavLink, withRouter } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import Logout from 'material-ui/svg-icons/action/power-settings-new';
import { clearStorage } from '../Lib/helpers';
import { checkAuth } from '../actions/index';
import { getUID } from '../Lib/helpers';
import { Link } from 'react-router-dom';
import { logout } from '../actions/index';
import SearchBanquet from '../containers/SearchBanquets';

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
            drawerOpened: false,
            searchDate: '',
        }
        this.renderLinks = this.renderLinks.bind(this);
        this.renderContent = this.renderContent.bind(this);
        this.searchByDate = this.searchByDate.bind(this);
    }

    searchByDate() {
        console.log()
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
            console.log('this.props before logout', this.props);
            this.props.logout();
            this.props.history.push('/');
        })
    }

    renderLinks() {
        const { userInfo } = this.props;
        if (userInfo) {
            if (userInfo.role === 'admin') {
                return (
                    <div>
                        <ListItem leftAvatar={<Avatar>{this.props.userInfo ? this.props.userInfo.firstName[0] : ''}</Avatar>}>
                            <NavLink to="/banquet/dashboad" onClick={this._toggleDrawer}>Dashboard</NavLink>
                        </ListItem>
                        <ListItem>
                            <NavLink to="/banquet/update" onClick={this._toggleDrawer}>Update Banquet Details</NavLink>
                        </ListItem>
                        {/* <ListItem>
                            <NavLink to="/contactUs" onClick={this._toggleDrawer}>Contact Us</NavLink>
                        </ListItem> */}
                        <ListItem>
                            <NavLink to="/aboutUs" onClick={this._toggleDrawer}>About Us</NavLink>
                        </ListItem>
                    </div>
                )
            } else if (userInfo.role === 'user') {
                // console.log("user ******")
                return (
                    <div>
                        <ListItem leftAvatar={<Avatar>{this.props.userInfo.firstName[0]}</Avatar>}>
                            <NavLink to="/user/dashboad" onClick={this._toggleDrawer}>Dashboard</NavLink>
                        </ListItem>
                        <ListItem>
                            <NavLink to="/list" onClick={this._toggleDrawer}>List of Banquets</NavLink>
                        </ListItem>
                        <ListItem>
                            {/* <NavLink to="/contactUs" onClick={this._toggleDrawer}>Contact Us</NavLink> */}
                        </ListItem>
                        <ListItem>
                            <NavLink to="/aboutUs" onClick={this._toggleDrawer}>About Us</NavLink>
                        </ListItem></div>)

            } else {
                return null;
            }
        }
        return null;
    }
    renderContent() {
        const { userInfo } = this.props;
        if (userInfo) {
            return (
                <div className="container-fluid header-wrap">
                    <AppBar title='Majestic Banquet' onLeftIconButtonTouchTap={() => this._toggleDrawer()} />
                    <Drawer open={this.state.drawerOpened} docked={false} onRequestChange={() => this._toggleDrawer()}>
                        <List>
                            <Card>
                                <CardHeader
                                    title={`${this.props.userInfo.firstName} ${this.props.userInfo.lastName}`}
                                    subtitle={this.props.userInfo.email} />
                            </Card>
                            <Divider style={dividerStyle} />
                            {this.renderLinks()}
                            <FlatButton style={logoutStyles} icon={<Logout />} label="Signout" fullWidth={true} onTouchTap={() => this.signOut()} />
                        </List>
                    </Drawer>
                </div>
            );
        } else {
            return (
                <div>
                    <div id="flipkart-navbar">
                        <div className="container">
                            <div className="row row1">
                                <ul className="largenav">
                                    <ul className="largenav" style={{ display: 'inline' }}>
                                        <li className="upper-links">
                                            <NavLink to="/aboutUs" className="links">About Us</NavLink></li>
                                        <li className="upper-links"><NavLink to="/" className="links">Home</NavLink></li>
                                        <li className="upper-links"><NavLink to="/list" className="links">Banquets</NavLink ></li>
                                    </ul>

                                    <ul className="largenav pull-right">
                                        <li className="upper-links"><NavLink to="/signup/admin" className="links">Register as Banquet</NavLink ></li>
                                        <li className="upper-links"><NavLink to="/signup/user" className="links">Register as User</NavLink ></li>
                                        <li className="upper-links"><NavLink to="/signin" className="links">Login</NavLink ></li>
                                    </ul>
                                </ul>

                            </div>
                            <div className="row row2">
                                <div className="col-sm-2">
                                    <h2><span className="smallnav menu" onclick="openNav()">☰ Brand</span></h2>
                                    <a href="/" style={{ color: '#fff' }} className="logo"><h1><span className="largenav">Majestic Banquets</span></h1></a>
                                </div>
                                <div className="flipkart-navbar-search smallsearch col-sm-8 col-xs-11">
                                    <div className="row">
                                        {/* <SearchBanquet /> */}
                                        {/* <input
                                            className="flipkart-navbar-input col-xs-11"
                                            type="text" placeholder="Search for Banquets" style={{ color: '#000' }}
                                        /> */}
                                        {/* <button className="flipkart-navbar-button col-xs-1" onClick={() => this.props.history.push("/list")}>
                                            <svg width="15px" height="15px">
                                                <path d="M11.618 9.897l4.224 4.212c.092.09.1.23.02.312l-1.464 1.46c-.08.08-.222.072-.314-.02L9.868 11.66M6.486 10.9c-2.42 0-4.38-1.955-4.38-4.367 0-2.413 1.96-4.37 4.38-4.37s4.38 1.957 4.38 4.37c0 2.412-1.96 4.368-4.38 4.368m0-10.834C2.904.066 0 2.96 0 6.533 0 10.105 2.904 13 6.486 13s6.487-2.895 6.487-6.467c0-3.572-2.905-6.467-6.487-6.467 "></path>
                                            </svg>
                                        </button> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                    <div id="mySidenav" className="sidenav">
                        <div className="container" style={{ backgroundColor: '#2874f0', paddingTop: 10 }}>
                            <span className="sidenav-heading">Home</span>
                            <a href="javascript:void(0)" className="closebtn" onclick="closeNav()">×</a>
                        </div>
                        <a href="http://clashhacks.in/">Link</a>
                        <a href="http://clashhacks.in/">Link</a>
                        <a href="http://clashhacks.in/">Link</a>
                        <a href="http://clashhacks.in/">Link</a>
                    </div>
                </div >
            )
        }
    }
    render() {
        const { userInfo } = this.props;
        return this.renderContent();
    }
}

function mapStateToProps(state) {
    return {
        userInfo: state.user.userInfo,
    };
}

function mapDispatchToProps(dispatch) {
    return ({
        logout: (role) => { dispatch(logout(role)) }
    })
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Header));


