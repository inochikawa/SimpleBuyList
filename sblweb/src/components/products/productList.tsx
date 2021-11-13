import * as React from "react";
import {DbSetCollection} from "../../shared/firestore/DbSetCollection";
import {useEffect, useRef, useState} from "react";
import {Product} from "../../shared/firestore/models/Product";
import {Button, Card, Checkbox, PageHeader, Space} from "antd";

import "./productList.less";
import { orderBy, where } from "firebase/firestore";
import {AddProduct} from "./addProduct";
import {useNavigate} from "react-router-dom";
import {RouteCollection} from "../../shared/route/RouteCollection";

const whereWasNotBought = where("wasBought", "==", false);
const whereWasBought = where("wasBought", "==", true);
const productsOrder = orderBy("createdDate");

export const ProductList = () => {
    const dbSet = useRef(new DbSetCollection().products).current;
    const [products, setProducts] = useState([] as Product[]);
    const [showCompleted, setShowCompleted] = useState(false);
    const navigator = useNavigate();

    const reloadProducts  = () => {
        const wherePredicate = showCompleted ? whereWasBought : whereWasNotBought;

        dbSet.getAll(productsOrder, wherePredicate).then((data) => {
            setProducts(data);
        });
    }

    useEffect(() => {
        reloadProducts();
        // eslint-disable-next-line
    }, [showCompleted]);

    return(
        <>
            <PageHeader
                title={"Products"}
                subTitle={showCompleted ? "Already bought" : "Need to buy"}
                onBack={() => navigator(RouteCollection.root.path)}
                extra={<Button onClick={() => setShowCompleted(!showCompleted)}>{showCompleted ? "Show new" : "Show completed"}</Button>}
            >
                <Space size={12} direction={"vertical"}>
                    {products.map((i, index) => (
                        <Card className="product-card" key={index}>
                            <Checkbox checked={i.wasBought} onChange={(e) => {
                                const newProduct = {
                                    ...i,
                                    wasBought: e.target.checked
                                } as Product;

                                dbSet.set(newProduct).then(() => {
                                    reloadProducts();
                                });
                            }}>{i.name}</Checkbox>
                        </Card>
                    ))}

                    {!showCompleted && (
                        <AddProduct onAdd={(newProduct) => {
                            dbSet.set(newProduct).then(() => {
                                reloadProducts();
                            });
                        }}/>
                    )}
                </Space>
            </PageHeader>
        </>
    );
}