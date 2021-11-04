import firebase from "firebase/compat";
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;
import DocumentData = firebase.firestore.DocumentData;
import {FirestoreModelInnerProps, FirestoreSnapshotOptions} from "./interfaces";

interface IDataConverter {
    toFirestore: (data: any) => DocumentData;
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: FirestoreSnapshotOptions) => any;
}

class DataConverterImplementation implements IDataConverter {
    fromFirestore(snapshot: QueryDocumentSnapshot<DocumentData>, options: FirestoreSnapshotOptions): any {
        const data = {
            ...snapshot.data()!, // all props from DB
            ...options // additional props that indicates what collection and ignored props
        };
        return data;
    }

    toFirestore(data: any): DocumentData {
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