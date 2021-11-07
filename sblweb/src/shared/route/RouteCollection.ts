import {AppRoute} from "./AppRoute";

export class RouteCollection {
    static readonly root: AppRoute = new AppRoute("/*");

    static readonly productList: AppRoute = new AppRoute("products", RouteCollection.root);
    static readonly productDetails: AppRoute = new AppRoute(":productId", RouteCollection.productList);

    static readonly login: AppRoute = new AppRoute("login", RouteCollection.root);
}