import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer, createFirestoreInstance } from 'redux-firestore';
import thunk from 'redux-thunk';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

// Custom Reducers
import searchUserReducer from './reducers/searchUserReducer';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDa2xuvuxGZvxY_z-cnrLvq9Pcb7NPLfxU",
    authDomain: "x-project-1.firebaseapp.com",
    databaseURL: "https://x-project-1.firebaseio.com",
    projectId: "x-project-1",
    storageBucket: "x-project-1.appspot.com",
    messagingSenderId: "645546586124",
    appId: "1:645546586124:web:3c3b4af4eb9f0631513e29"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();
//firebase.analytics();

// React-Redux configuration.
const rrfConfig = {
    userProfile: 'products',
    useFirestoreForProfile: true
};

// Reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    user: searchUserReducer
});

// Setting thunk in a middlewares array
const middlewares = [ thunk ];

// Initial State
const initialState = {};

// Create Store
const store = createStore(
    rootReducer, 
    initialState,
    compose(applyMiddleware(...middlewares), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

export const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance
}

export default store;