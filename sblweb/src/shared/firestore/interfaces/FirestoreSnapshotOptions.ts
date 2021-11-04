import firebase from "firebase/compat";
import SnapshotOptions = firebase.firestore.SnapshotOptions;
import {FirestoreModelInnerProps} from "./FirestoreModelInnerProps";

export interface FirestoreSnapshotOptions extends SnapshotOptions, FirestoreModelInnerProps {
};