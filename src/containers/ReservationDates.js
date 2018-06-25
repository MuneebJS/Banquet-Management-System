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
import { banquetRef, reservationDates } from '../firebase';
import Loader from '../components/Loader';
import ListingCard from '../components/ListingCard';
import { CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ReactTable from 'react-table';
// import ReservationDates from 'react-router-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';// import TableHeaderColumn from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import _ from 'lodash';
// with es6
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
// import '../../'






class ReservationDates extends Component {
    constructor() {
        super();
        this.state = {
            drawerOpened: false,
            banquets: null,
            dates: {},
            year: 118,
            month: 6,
            tableDates: [],
        }
        this.getBanquetDates = this.getBanquetDates.bind(this);
        this.changeYear = this.changeYear.bind(this);
        this.changeMonth = this.changeMonth.bind(this);
        this.setDisabledDates = this.setDisabledDates.bind(this);
        this.setDates = this.setDates.bind(this);
        this.handleReserve = this.handleReserve.bind(this);
        // this.cardClick = this.cardClick.bind(this);
        // this.getBanquetsByDate = this.getBanquetsByDate.bind(this);
    }
    componentDidMount() {
        sessionStorage.removeItem('banquetDetails');
        const date = new Date();
        this.setState({
            month: date.getMonth(),
            year: date.getYear(),
        })
        this.getBanquetDates();
        this.setDates();

        // this.setDisabledDates();
    }

    getBanquetDates() {
        const _this = this;
        const banUID = this.props.match.params.uid;
        const nestedRef = reservationDates.child(banUID + '/')
        reservationDates.on('value', snapshot => {
            const dates = snapshot.val();
            const datesArr = [];
            for (var key in dates) {
                datesArr.push(dates[key]);
            }
            // console.log("datesArr", datesArr[0])
            this.setState({
                dates: datesArr[0],
            })
        })
    }

    setDisabledDates() {
        const { year, month, dates, tableDates } = this.state;
        if (!_.isEmpty(dates) && _.isObject(dates[year]) && _.isObject(dates[year][month])) {
            let reservedDates = dates[year][month];
            let filteredDates = tableDates;
            _.forIn(reservedDates, (value, key) => {
                let reservationIndex = _.findIndex(tableDates, (o) => {
                    return o.date == value
                });
                filteredDates[reservationIndex].availability = 0;
            })
            this.setState({
                tableDates: filteredDates,
            });
        } else {
            this.setDates();
        }
    }

    setDates() {
        let dates = [];
        let years = { 118: '2018', 119: '2019', 120: '2020', 121: '2021', 122: '2022' };
        let months = { 0: 'Jan', 1: 'Feb', 2: 'Mar', 3: 'Apr', 4: 'May', 5: 'Jun', 6: 'Jul', 7: 'Aug', 8: 'Sep', 9: 'Oct', 10: 'Nov', 11: 'Dec' }
        for (let i = 0; i < 30; i++) {
            dates.push({ date: i + 1, availability: 1, year: years[this.state.year], month: months[this.state.month] })
        }
        this.setState({
            tableDates: dates,
        });
    }

    changeYear(e, i, year) {
        this.setState({ year: year });
        this.setDisabledDates();
    }

    changeMonth(e, i, month) {
        this.setState({ month: month });
        this.setDisabledDates();
    }

    handleReserve(cell, value) {
        localStorage.setItem("bookingDate", value.date);
        localStorage.setItem("bookingYear", value.year);
        localStorage.setItem("bookingMonth", this.state.month);
        this.props.history.push(`/booking/${this.props.match.params.uid}`)
    }

    render() {
        return (
            <div>
                <DropDownMenu value={this.state.year} onChange={this.changeYear} search={true}>
                    <MenuItem value={118} primaryText="2018" />
                    <MenuItem value={119} primaryText="2019" />
                    <MenuItem value={120} primaryText="2020" />
                    <MenuItem value={121} primaryText="2021" />
                    <MenuItem value={122} primaryText="2022" />
                </DropDownMenu>

                <DropDownMenu value={this.state.month} onChange={this.changeMonth}>
                    <MenuItem value={0} primaryText="Jan" />
                    <MenuItem value={1} primaryText="Fev" />
                    <MenuItem value={2} primaryText="Mar" />
                    <MenuItem value={3} primaryText="Apr" />
                    <MenuItem value={4} primaryText="May" />
                    <MenuItem value={5} primaryText="Jun" />
                    <MenuItem value={6} primaryText="Jul" />
                    <MenuItem value={7} primaryText="Aug" />
                    <MenuItem value={8} primaryText="Sep" />
                    <MenuItem value={9} primaryText="Oct" />
                    <MenuItem value={10} primaryText="Nov" />
                    <MenuItem value={11} primaryText="Dec" />
                </DropDownMenu>

                <BootstrapTable data={this.state.tableDates}>
                    {/* <TableHeaderColumn dataField='id' isKey>Product ID</TableHeaderColumn> */}
                    <TableHeaderColumn dataField='month'>Month</TableHeaderColumn>
                    <TableHeaderColumn dataField='year'>Year</TableHeaderColumn>
                    <TableHeaderColumn dataField='date' isKey>Date</TableHeaderColumn>
                    <TableHeaderColumn dataField='availability' dataFormat={(cell) => {
                        return (<div>{cell ? 'Available' : 'Not Available'}</div>);
                    }}>Availablity</TableHeaderColumn>
                    <TableHeaderColumn dataField='availability' dataFormat={(cell, value) => {
                        return (cell ? <a href="javascript:void(0)" onClick={() => this.handleReserve(cell, value)}>Reserve</a> : <Link to='/booking'>Go Back</Link>);
                    }}>Availablity</TableHeaderColumn>
                </BootstrapTable>
            </div>)
    }
}

function mapStateToProps(state) {
    return {}
}

// export default connect(mapStateToProps, null)(list);
export default connect(mapStateToProps, null)(withRouter(ReservationDates));

