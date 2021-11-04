import {IModel} from "./IModel";
import {firestoreModel} from "../decorators/firestoreModel";
import { v4 as guid } from "uuid";

@firestoreModel({
    ignoreProps: ["testPropToIgnore"],
    collection: "products"
})
export class Product implements IModel {
    public id: string = guid();
    public createdOn: Date = new Date();

    public name: string | undefined;
    public wasBought: boolean = false;

    public testPropToIgnore: string = "BLALAALALALA";
}