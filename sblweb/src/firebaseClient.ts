import firebase from "firebase/compat";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    databaseURL: process.env.REACT_APP_databaseURL,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId
};

// Initialize Firebase
export const initFirebaseApp = () => {
    console.log("config: ", firebaseConfig);

    firebase.initializeApp(firebaseConfig);

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log("User log in: ", user)
        } else {
            // User is signed out.
            console.log("User log out")
        }
    }, function(error) {
        console.log(error);
    });
};