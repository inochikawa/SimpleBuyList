import React from "react";
import {Login} from "./components/login";
import { Route, Routes, useNavigate} from "react-router-dom";
import {RouteCollection} from "./shared/route/RouteCollection";
import {ProductList} from "./components/products";
import {Layout, Menu} from "antd";
import {CalendarOutlined, HomeOutlined, UnorderedListOutlined} from "@ant-design/icons";
import {Home} from "./components/home/home";

const { Header, Content, Footer } = Layout;

function App() {
    const navigate = useNavigate();

  return (
    <>
        <Layout>
            <Header>
                <Menu mode={"horizontal"}>
                    <Menu.Item key={0} icon={<HomeOutlined />} onClick={() => navigate(RouteCollection.root.path)}>Home</Menu.Item>
                    <Menu.Item key={1} icon={<UnorderedListOutlined />} onClick={() => navigate(RouteCollection.productList.path)}>Products</Menu.Item>
                    <Menu.Item key={2} icon={<CalendarOutlined />} >Forik schedule</Menu.Item>
                </Menu>
            </Header>
            <Layout>
                <Content>
                    <Routes>
                        <Route path={RouteCollection.root.path} element={<Home/>}/>
                        <Route path={RouteCollection.productList.path} element={<ProductList/>}/>
                        <Route path={RouteCollection.login.path} element={<Login/>}/>
                    </Routes>
                </Content>
            </Layout>
            <Footer>
                Made with love ♥️
            </Footer>
        </Layout>
    </>
  );
}

export default App;
