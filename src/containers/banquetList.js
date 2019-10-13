import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseApp } from '../firebase.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardHeader } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { banquetRef } from '../firebase';
import Loader from '../components/Loader';
import { CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card';



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
        this.getBanquetsByDate = this.getBanquetsByDate.bind(this);
    }
    componentDidMount() {
        sessionStorage.removeItem('banquetDetails');
        this.getBanquets();
        this.getBanquetsByDate();
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
    getBanquetsByDate() {
        // console.log("got the data! =======", this)
        const _this = this;
        // banquetRef.orderByChild("date").startAt(startDate).endAt(endDate)
        banquetRef.orderByChild("location").equalTo('north karachi')
        // banquetRef
        // .endAt('north karachi')
            .on("value", function (snapshot) {
                console.log("got the data!", snapshot.val());
            });
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
                        let imgBase64 = '';
                        if (ban.images && ban.images.length) imgBase64 = ban.images[0].image;
                        return (
                            <Card containerStyle={{ marginTop: 20, padding: 20, paddingBottom: '0px !important' }}>
                                <CardHeader
                                    title={ban.name}
                                    subtitle={ban.location}
                                />
                                <CardMedia
                                    overlay={<CardTitle title={ban.name} subtitle={ban.phoneNumber} />}
                                >
                                    <img src={"data:image/jpeg;" + imgBase64} />
                                </CardMedia>
                                <CardText>
                                    {ban.description}
                                </CardText>
                                <CardActions>
                                    <FlatButton label="View" primary={true} onClick={() => this.cardClick(ban)} />
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
