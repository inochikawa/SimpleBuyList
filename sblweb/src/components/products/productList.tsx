import * as React from "react";
import {DbSetCollection} from "../../shared/firestore/DbSetCollection";
import {useEffect, useRef, useState} from "react";
import {Product} from "../../shared/firestore/models/Product";
import {Button, Card, Checkbox, Col, PageHeader, Row, Space} from "antd";

import "./productList.less";
import { orderBy, where } from "firebase/firestore";
import {AddProduct} from "./addProduct";
import {useNavigate} from "react-router-dom";
import {RouteCollection} from "../../shared/route/RouteCollection";
import { Typography } from 'antd';
import {CheckboxChangeEvent} from "antd/lib/checkbox";
import moment from "moment";
import {FlagFilled, FlagOutlined} from "@ant-design/icons";

const { Paragraph } = Typography;

const whereWasNotBought = where("wasBought", "==", false);
const whereWasBought = where("wasBought", "==", true);
const productsOrder = orderBy("createdDate");



export const ProductList = () => {
    const dbSet = useRef(new DbSetCollection().products).current;
    const [products, setProducts] = useState([] as Product[]);
    const [isLoading, setIsLoading] = useState(false);
    const [showCompleted, setShowCompleted] = useState(false);
    const navigator = useNavigate();

    const reloadProducts  = () => {
        const wherePredicate = showCompleted ? whereWasBought : whereWasNotBought;

        dbSet.getAll(productsOrder, wherePredicate).then((data) => {
            setProducts(data);
            setIsLoading(false);
        });
    }

    useEffect(() => {
        setIsLoading(true);
        reloadProducts();
        // eslint-disable-next-line
    }, [showCompleted]);

    const onProductNameChange = (newName: string, i: Product) => {
        setIsLoading(true);
        const newProduct = { ...i, name: newName } as Product;

        dbSet.set(newProduct).then(() => {
            reloadProducts();
        });
    };

    const onProductBoughtChange = (i: Product, e: CheckboxChangeEvent) => {
        setIsLoading(true);
        const newProduct = { ...i, wasBought: e.target.checked } as Product;

        dbSet.set(newProduct).then(() => {
            reloadProducts();
        });
    };

    const onProductUrgentChange = (i: Product) => {
        setIsLoading(true);
        const newProduct = { ...i, isUrgent: !i.isUrgent } as Product;

        dbSet.set(newProduct).then(() => {
            reloadProducts();
        });
    };

    const flag = (isUrgent: boolean) => isUrgent
        ? <FlagFilled />
        : <FlagOutlined />;

    return(
        <>
            <PageHeader
                title={"Products"}
                subTitle={showCompleted ? "Already bought" : "Need to buy"}
                onBack={() => navigator(RouteCollection.root.path)}
                extra={<Button onClick={() => setShowCompleted(!showCompleted)}>{showCompleted ? "Show new" : "Show completed"}</Button>}
            >
                <Space size={12} direction={"vertical"} className={"product-card-holder"}>
                    {products.map((i, index) => (
                        <Card
                            className={`product-card ${i.isUrgent && "urgent"}`}
                            key={index}
                            loading={isLoading}
                        >
                            <Row>
                                <Col span={2} lg={1}>
                                    <Checkbox
                                        checked={i.wasBought}
                                        onChange={(e) => onProductBoughtChange(i, e)}
                                        className={"product-card-checkbox"}
                                    > </Checkbox>
                                </Col>
                                <Col span={20} lg={22}>
                                    <Paragraph
                                        editable={{
                                            onChange: (newValue) => onProductNameChange(newValue, i)
                                        }}
                                    >{i.name}</Paragraph>
                                </Col>
                                <Col span={2} lg={1}>
                                    <Button
                                        type="ghost"
                                        shape="circle"
                                        icon={flag(i.isUrgent)}
                                        onClick={() => onProductUrgentChange(i)}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col span={2} lg={1}></Col>
                                <Col span={22} lg={23}>{moment(i.createdDate).local().format("DD/MM/YYYY HH:mm")}</Col>
                            </Row>
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