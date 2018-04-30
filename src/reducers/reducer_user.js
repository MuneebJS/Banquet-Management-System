import { SIGNED_IN, CHECK_AUTH_FAILED, CHECK_AUTH_SUCCESS, AUTH_PENDING } from '../constants';

let user = {
    email: null,
    isLoggedIn: false,
    isAuthPending: true,
    role: null,
}

export default (state = user, action) => {
    switch (action.type) {
        case AUTH_PENDING:
            return {
                ...state,
                isAuthPending: true,
                isLoggedIn: false,
            };
        case CHECK_AUTH_SUCCESS:
            console.log("is auth success")

            return {
                ...state,
                isLoggedIn: true,
                isAuthPending: false,
                // role: action.payload.role
            };
        case CHECK_AUTH_FAILED:
            return {
                ...state,
                isLoggedIn: false,
                isAuthPending: false,
            };

        default:
            return state;
    }
}