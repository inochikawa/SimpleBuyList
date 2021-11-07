import * as React from "react";
import {DbSetCollection} from "../../shared/firestore/DbSetCollection";
import {useEffect, useState} from "react";
import {Product} from "../../shared/firestore/models/Product";

export const ProductList = () => {
    const [dbSet] = useState(new DbSetCollection().products);
    const [products, setProducts] = useState([] as Product[]);

    useEffect(() => {
        dbSet.getAll().then((data) => {
            setProducts(data);
        });
    }, [dbSet]);

    return(
        <>
            <div>Here is a product list</div>
            {products.map((i, index) => (
                <div key={index}>
                    {i.name}
                </div>
            ))}
        </>
    );
}