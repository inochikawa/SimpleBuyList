import {IModel} from "./IModel";
import {firestoreModel} from "../decorators/firestoreModel";
import { v4 as guid } from "uuid";

@firestoreModel({
    ignoreProps: [],
    collection: "products"
})
export class Product implements IModel {
    public id: string = guid();
    public createdDate: string = new Date().toISOString();

    public name: string | undefined;
    public wasBought: boolean = false;
}