import React from "react";
import {useNavigate} from "react-router-dom";
import {Card, Col, Row} from "antd";
import {RouteCollection} from "../../shared/route/RouteCollection";

export const Home = () => {
    const navigate = useNavigate();

    return (
        <Row>
            <Col>
                <Card onClick={() => navigate(RouteCollection.productList.path)}>
                    Products
                </Card>
            </Col>
            <Col>
                <Card >
                    Forik!!
                </Card>
            </Col>
        </Row>
    )
};