import React from "react";
import {Login} from "./components/login";
import {Link, Route, Routes, useNavigate} from "react-router-dom";
import {RouteCollection} from "./shared/route/RouteCollection";
import {ProductList} from "./components/products";
import {Layout, Menu} from "antd";

const { Header, Content, Footer, Sider } = Layout;

function App() {
    const navigate = useNavigate();

  return (
    <>
        <Layout>
            <Header>
                Simple buy list
            </Header>
            <Layout>
                <Sider>
                    <Menu>
                        <Menu.Item key={0} onClick={() => navigate(RouteCollection.root.path)}>Home</Menu.Item>
                        <Menu.Item key={1} onClick={() => navigate(RouteCollection.productList.path)}>What to buy?</Menu.Item>
                        <Menu.Item key={2}>Forik kushat schedule</Menu.Item>
                    </Menu>
                </Sider>
                <Content>
                    <Routes>
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
