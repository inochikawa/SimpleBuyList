import {FirestoreDbSet} from "./FirestoreDbSet";
import {Product} from "./models/Product";

export class DbSetCollection {
    public products: FirestoreDbSet<Product> = new FirestoreDbSet<Product>(Product);
}