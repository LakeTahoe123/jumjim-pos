import React, {useEffect ,useState} from 'react';

// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBi1o8r_iZbXGdiFl5bjNWqWs1pGgAPGYk",
  authDomain: "jumjim-pos.firebaseapp.com",
  databaseURL: "https://jumjim-pos.firebaseio.com",
  projectId: "jumjim-pos",
  storageBucket: "jumjim-pos.appspot.com",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const ProductButton = (product) => {
  return(
    <div className='product_button'>
      <p className='product--name'>{ product.name }</p>
      <p className='product--price'>{ product.price }</p>
      <style jsx>{`
        .product_button {
          width: 100px;
          height: 100px;
          display: inline-block;
          border: 1px solid;
          padding: 10px;
          margin: 8px;
        }
    `}</style>
    </div>
  )
}

const Index = ({ products }) => {
  return (
    <div>
      <div className='column__products'>
        {products.map(ProductButton) }
      </div>
      <style jsx>{`
        .column__products {
          width: 70%;
          display: inline-block;
        }
    `}</style>
    </div>
  )
};

Index.getInitialProps = async ({ req }) => {
  const db = firebase.firestore()
  const products = await db.collection("products").get()
    .then(function(querySnapshot) {
      const ps = []
      querySnapshot.forEach(doc => ps.push(doc.data()))
      return ps
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error)
    });
  console.info(products)
  return { products }
};

export default Index