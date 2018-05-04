import { SIGNED_IN, CHECK_AUTH_FAILED, CHECK_AUTH_SUCCESS, AUTH_PENDING, LOGOUT } from '../constants';

let user = {
    userInfo: null,
}

export default (state = user, action) => {
    switch (action.type) {
        case AUTH_PENDING:
            return {
                ...state,
                // isAuthPending: true,
                isLoggedIn: false,
            };
        case CHECK_AUTH_SUCCESS:
            console.log("is auth success", action.payload)

            return {
                ...state,
                userInfo: action.payload,
                // isLoggedIn: true,
                // isAuthPending: false,
                // role: action.payload.role
            };
        case CHECK_AUTH_FAILED:
            return {
                ...state,
                userInfo: null
                // isLoggedIn: false,
                // isAuthPending: false,
            };
        case LOGOUT:
            return {
                ...state,
                userInfo: null,
            };

        default:
            return state;
    }
}