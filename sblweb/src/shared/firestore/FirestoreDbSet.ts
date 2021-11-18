import {collection, doc, getDoc, getDocs, getFirestore, onSnapshot, query, QueryConstraint, setDoc} from "firebase/firestore";
import {dataConverter} from "./DataConverter";
import {IModel} from "./models/IModel";
import {FirestoreModelInnerProps, FirestoreSnapshotOptions} from "./interfaces";
import firebase from "firebase/compat";

export class FirestoreDbSet<TData extends IModel> {
    private readonly _modelInnerProps: FirestoreModelInnerProps;

    constructor(private _dataCtor: new () => TData) {
        const data = new this._dataCtor() as any;

        this._modelInnerProps = {
            FIRESTORE_ignoredProps: data["FIRESTORE_ignoredProps"],
            FIRESTORE_collectionName: data["FIRESTORE_collectionName"]
        };
    }

    set = async (item: TData): Promise<void> => {
        await setDoc(this.docWithId(item.id), item);
    }

    get = async (id: string | undefined): Promise<TData | null> => {
        const docSnap = await getDoc(this.docWithId(id));

        if (docSnap.exists()) {
            return docSnap.data({
                ...this._modelInnerProps
            } as FirestoreSnapshotOptions) as TData;
        }

        return null;
    }

    getAll = async (...queryConstraint: QueryConstraint[]): Promise<TData[]> => {
        console.log("Get all from ", this._modelInnerProps.FIRESTORE_collectionName);

        const q = query(collection(getFirestore(), this._modelInnerProps.FIRESTORE_collectionName), ...queryConstraint).withConverter(dataConverter);
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(x => {
            const d = x.data({
                ...this._modelInnerProps
            } as FirestoreSnapshotOptions);

            console.log(this._modelInnerProps.FIRESTORE_collectionName,": Got data: ", d)

            return d;
        }) as TData[];
    }

    subscribeOnDataChange = (onChange: (querySnapshot: firebase.firestore.QuerySnapshot<TData>) => void) => {
        const q = query(collection(getFirestore(), this._modelInnerProps.FIRESTORE_collectionName)).withConverter(dataConverter);
        return onSnapshot(q, (snapshot) => {
            onChange(snapshot as any);
        });
    }

    private docWithId = (id: string | undefined) => {
        if (!id) {
            throw new Error("ID cannot be null or undefined");
        }

        return doc(getFirestore(), this._modelInnerProps.FIRESTORE_collectionName, id).withConverter(dataConverter);
    };
}
