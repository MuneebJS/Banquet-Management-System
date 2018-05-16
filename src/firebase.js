import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyByzDHgb1HA5NmmszlEXXQmR1DxaxJT_yw",
    authDomain: "business-portal-c5066.firebaseapp.com",
    databaseURL: "https://business-portal-c5066.firebaseio.com",
    projectId: "business-portal-c5066",
    storageBucket: "business-portal-c5066.appspot.com",
    messagingSenderId: "65159658490"
};

// var storage = firebase.storage();

export const firebaseApp = firebase.initializeApp(config);
export const customerInfo = firebase.database().ref('Customers');
export const userRef = firebase.database().ref('Users');
export const banquetRef = firebase.database().ref('Banquets');
export const reservationRef = firebase.database().ref('ReservationRequests');
export const acceptedRef = firebase.database().ref('AcceptedRequests');
export const customerAccetedRef = firebase.database().ref('CustomerAcceptedRequests');
export const customerRejectedRef = firebase.database().ref('CustomerRejectedRequests');

export const banquetImagesRef = firebase.storage().ref('banquetImages');
// export const completeGoalRef = firebase.database().ref('completeGoals')