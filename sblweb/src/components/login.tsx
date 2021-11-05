import * as React from "react";
import {useEffect, useState} from "react";

import firebase from "firebase/compat";

import {auth} from "firebaseui";
import "firebaseui/dist/firebaseui.css";

const uiConfig = {
    signInSuccessUrl: '/',
    signInOptions: [
        firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback function.
    // Terms of service url/callback.
    tosUrl: function() {
        // ignore
    },
    // Privacy policy url/callback.
    privacyPolicyUrl: function() {
        // ignore
    },
};

export const Login = () => {
    const [wasWidgetRendered, setWasWidgetRendered] = useState(false);

    useEffect(() => {
        // to prevent extra widget loading because this throws exception from FirebaseUI
        if (!wasWidgetRendered) {
            const ui = new auth.AuthUI(firebase.auth());
            ui.start('#firebaseui-auth-container', uiConfig);

            setWasWidgetRendered(true);
        }
    }, [wasWidgetRendered]);

    return (<div id="firebaseui-auth-container">test</div>);
}