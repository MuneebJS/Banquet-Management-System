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
import Majestic from './majestic';


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
                    <div>
                        <Card>
                            <CardMedia
                                overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
                            >
                                <img
                                    src="https://media.weddingz.in/images/bed39c320b1569a282d37b44f39c7f71/rajmahal-banquets-malad-west-mumbai.jpg"
                                    alt=""
                                    className="banquetDetailImg"
                                />
                            </CardMedia>
                            <CardTitle title="Card title" subtitle="Card subtitle" />
                            <CardText>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                                Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                                Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                          </CardText>
                            <CardActions>
                                <FlatButton label="Reserve" primary={true} />
                                {/* <FlatButton label="Action2" /> */}
                            </CardActions>
                        </Card>
                    </div>
                </div>
            </MuiThemeProvider>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps, null)(BanquetDetail);
