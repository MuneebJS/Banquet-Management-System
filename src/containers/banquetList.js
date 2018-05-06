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
import { CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';



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
            console.log("snapshot.val()", snapshot.val())
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
        if (!this.state.banquets) return <Loader />
        return (
            <MuiThemeProvider>
                <div>
                    {this.state.banquets.map((ban, i) => {
                        // console.log("ban images")
                        return (
                            <Card>
                            <CardHeader
                              title="URL Avatar"
                              subtitle="Subtitle"
                              avatar="images/jsa-128.jpg"
                            />
                            <CardMedia
                              overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
                            >
                                     <img src={"data:image/jpeg;" + ban.images[0].image} />
                            
                            </CardMedia>
                            <CardTitle title="Card title" subtitle="Card subtitle" />
                            <CardText>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                              Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                              Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                              Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                            </CardText>
                            <CardActions>
                              <FlatButton label="Action1" />
                            </CardActions>
                          </Card>
                        )
                    })
                    }
                </div >
            </MuiThemeProvider >
        )
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps, null)(list);
