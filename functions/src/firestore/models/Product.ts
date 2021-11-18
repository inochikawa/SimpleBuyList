import { v4 as guid } from "uuid";

export class Product {
    public id: string = guid();
    public createdDate: string = new Date().toISOString();

    public name: string | undefined;
    public wasBought: boolean = false;
    public isUrgent: boolean = false;

    constructor(name: string) {
        this.name = name;
    }
}