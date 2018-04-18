import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getUID } from './lib/helpers';
import * as firebase from 'firebase';


class PrivateRoute extends React.Component {
    constructor() {
        super();
        this.state = {
            isAuthenticated: true,
        };
    }
    componentDidMount() {
        this.isAllowRoute();
    }
    isAllowRoute() {
        console.log("isAllowRoute")
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log("isAuthenticate if", user)
                // return true;
                this.setState({
                    isAuthenticated: true,
                })

            } else {
                console.log("isAuthenticate else", user)
                // return false;
                this.setState({
                    isAuthenticated: false,
                })
            }
        })
    }
    render() {
        const { component } = this.props;
        // console.log("private route")
        if (this.state.isAuthenticated) return <Route {...this.props} />
        return <Redirect
            to={{
                pathname: "/signin",
                // state: { from: props.location }
            }}
        />
        // return (
        //     <Route
        //         {...this.props}
        //         render={props => {
        //             if (!this.isAllowRoute) {
        //                 return (
        //                     <Redirect
        //                         to={{
        //                             pathname: "/signin",
        //                             // state: { from: props.location }
        //                         }}
        //                     />
        //                 )
        //             } else {
        //                 return <component {...this.props} />;
        //             }
        //         }
        //         }
        //     />
        // )
    }
}

// const PrivateRoute = ({ component: Component, ...rest }) => {
//     const isAuthenticated = firebase.auth().onAuthStateChanged(user => {
//         if (user) {
//             console.log("isAuthenticate if", user)
//             return true;
//         } else {
//             console.log("isAuthenticate else", user)
//             return false;
//         }
//     })

//     return (
//         <Route
//             {...rest}
//             render={props => {
//                 if (!isAuthenticated) {
//                     return (
//                         <Redirect
//                             to={{
//                                 pathname: "/signin",
//                                 // state: { from: props.location }
//                             }}
//                         />
//                     )
//                 } else {
//                     return <Component {...props} />;
//                 }
//             }

//             }
//         />
//     )
// };

export default PrivateRoute;