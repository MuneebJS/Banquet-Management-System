import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getUID } from './lib/helpers';
import * as firebase from 'firebase';
import { userRef } from './firebase';
import { connect } from 'react-redux';
import { checkAuth } from './actions/index';



class PrivateRoute extends React.Component {
    constructor() {
        super();
        this.checkAuth = this.checkAuth.bind(this);
    }
    componentDidMount() {
        const role = this.props.role;
        // this.props.checkAuth({ role });
    }
    checkAuth() {
        const { role, userInfo } = this.props;
        if (!userInfo) return false;
        if (role !== userInfo.role) return false;
        return true;
        // console.log(this.props);
    }
    render() {
        console.log("checkAuth from private route", this.checkAuth());
        // if (this.props.isAuthPending) return <h2>...Loading</h2>;
        // console.log("came after ifffffffff")
        return (
            <Route {...this.props.routeProps} render={() => (
                this.checkAuth() ? (
                    <div>{this.props.children}</div>
                ) : (
                        <Redirect to={{
                            pathname: `/signin`,
                        }} />
                    )
            )} />
        )
    }
};

function mapStateToProps(state) {
    return {
        userInfo: state.user.userInfo,
        //   common: state.common
    };
}

function mapDispatchToProps(dispatch) {
    return ({
        checkAuth: (role) => { dispatch(checkAuth(role)) }
    })
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PrivateRoute);

