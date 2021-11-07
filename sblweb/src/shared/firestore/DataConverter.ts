import {FirestoreModelInnerProps, FirestoreSnapshotOptions} from "./interfaces";
import firebase from "firebase/compat";


interface IDataConverter {
    toFirestore: (data: any) => firebase.firestore.DocumentData;
    fromFirestore: (snapshot: firebase.firestore.QueryDocumentSnapshot, options: FirestoreSnapshotOptions) => any;
}

class DataConverterImplementation implements IDataConverter {
    fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>, options: FirestoreSnapshotOptions): any {
        return {
            ...snapshot.data()!, // all props from DB
            ...options // additional props that indicates what collection and ignored props
        };
    }

    toFirestore(data: any): firebase.firestore.DocumentData {
        const ignoredProps: string[] = (data as FirestoreModelInnerProps).FIRESTORE_ignoredProps;
        const props = Object.keys(data).filter(x => ignoredProps.every(y => x !== y));

        const result: any = {};

        for (const prop of props) {
            result[prop] = data[prop];
        }

        return result;
    }
}

export const dataConverter: any = new DataConverterImplementation();