import { SIGNED_IN, AUTH_PENDING, SET_GOALS, SET_COMPLETED, CHECK_AUTH_FAILED, CHECK_AUTH_SUCCESS } from '../constants';
import * as firebase from 'firebase';
import { userRef } from '../firebase';




export function logUser(email) {
    const action = {
        type: SIGNED_IN,
        email
    }
    return action;
}

export function setGoals(goals) {
    const action = {
        type: SET_GOALS,
        goals
    }
    return action;
}

export function setCompleted(completeGoals) {
    const action = {
        type: SET_COMPLETED,
        completeGoals
    }
    return action;
}



function checkAuthSuccess() {
    return {
        type: CHECK_AUTH_SUCCESS,
    };
}
function checkAuthFailed() {
    return {
        type: CHECK_AUTH_FAILED,
    };
}

export function checkAuth({ role }) {
    console.log('roleee from actions', role);
    return (dispatch) => {
        dispatch({ type: AUTH_PENDING })
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                const nestedRef = userRef.child(`${user.uid}`)
                nestedRef.once('value')
                    .then((userDetails) => {
                        if (userDetails.val().role === role) {
                            console.log("true if");
                            dispatch(checkAuthSuccess());
                        } else {
                            dispatch(checkAuthFailed());
                        }
                    });
            } else {
                console.log("else last one")
                dispatch(checkAuthFailed());
            }
        })
    }
}