import * as React from "react";
import {Product} from "../../shared/firestore/models/Product";
import {useState} from "react";
import {Button, Card, Input} from "antd";

export const AddProduct = (props: { onAdd: (newProduct: Product) => void}) => {
    const [newProductName, setNewProductName] = useState("");

    const addButton = (
        <Button onClick={() => {
            const newProduct = new Product();
            newProduct.name = newProductName;

            if (props.onAdd) {
                props.onAdd(newProduct);
            }
        }}>Add</Button>
    );

    return <Card className="product-card">
        <Input
            size="large"
            placeholder={"Product name..."}
            suffix={addButton}
            value={newProductName}
            onChange={(e) => setNewProductName(e.target.value)}/>
    </Card>;
};