import * as functions from "firebase-functions";
import {admin} from "./admin";
import {Product} from "./firestore/models/Product";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const addProduct = functions.https.onRequest(async (request, response) => {
  const productName: string = request.query.name as string;
  const product = new Product(productName);

  try {
    await admin.firestore().collection("products").doc(product.id).set({...product});
    response.status(201).send(`Created product ${productName}`);
  } catch (e) {
    response.status(500).send(`Cannot insert new product with name ${productName}. ${e}`);
  }
});
