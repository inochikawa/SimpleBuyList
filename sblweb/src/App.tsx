import React from "react";
import {Login} from "./components/login";
import {Link, Route, Routes} from "react-router-dom";
import {RouteCollection} from "./shared/route/RouteCollection";
import {ProductList} from "./components/products";

function App() {
  return (
    <>
        <div>
            Welcome to ForyaAndTofu app!
            <Link to={RouteCollection.productList.path}>To products</Link>
            <Link to={RouteCollection.login.path}>To login</Link>
        </div>
        <Routes>
            <Route path={RouteCollection.productList.path} element={<ProductList/>}/>
            <Route path={RouteCollection.login.path} element={<Login/>}/>
        </Routes>
    </>
  );
}

export default App;
