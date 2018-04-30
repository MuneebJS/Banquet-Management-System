import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getUID } from './lib/helpers';
import * as firebase from 'firebase';
import { userRef } from './firebase';
import { connect } from 'react-redux';
import { checkAuth } from './actions/index';



class PrivateRoute extends React.Component {
    componentDidMount() {
        const role = this.props.role;
        this.props.checkAuth({ role });
    }
    render() {
        console.log("this.props from private route", this.props);
        if (this.props.isAuthPending) return <h2>...Loading</h2>;
        console.log("came after ifffffffff")
        return (
            <Route {...this.props.routeProps} render={() => (
                this.props.isLoggedIn ? (
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
        isLoggedIn: state.user.isLoggedIn,
        isAuthPending: state.user.isAuthPending,
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

