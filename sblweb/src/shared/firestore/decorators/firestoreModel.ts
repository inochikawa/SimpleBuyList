interface IFirestoreModelProps {
    ignoreProps: string[] | undefined;
    collection: string;
}

/**
 * Class decorator to add internal properties-helpers to the model
 */
export const firestoreModel = (props: IFirestoreModelProps) => {
    const ignoredProps = props.ignoreProps ? props.ignoreProps : [];

    // also ignore inner props that are used only by client
    ignoredProps.push("FIRESTORE_ignoredProps", "FIRESTORE_collectionName");

    return function<T extends { new (...args: any[]): {} }>(constructor: T) {
        return class extends constructor {
            /**
             * Collection of properties that will be ignored when converting from Object to Firestore Model
             */
            FIRESTORE_ignoredProps: string[] = ignoredProps;
            FIRESTORE_collectionName: string = props.collection;
        };
    };
};