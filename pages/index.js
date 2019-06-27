import React, { createContext, useContext, useReducer } from 'react'

import sumBy from 'lodash/sumBy'
import find from 'lodash/find'
import get from 'lodash/get'

// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app"

// Add the Firebase products that you want to use
import "firebase/auth"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBi1o8r_iZbXGdiFl5bjNWqWs1pGgAPGYk",
  authDomain: "jumjim-pos.firebaseapp.com",
  databaseURL: "https://jumjim-pos.firebaseio.com",
  projectId: "jumjim-pos",
  storageBucket: "jumjim-pos.appspot.com",
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

import POSContext from '../components/POSContext'
import ProductButton from '../components/ProductButton'
import cartReducer, { initCart } from '../reducers/cartReducer'

const Index = ({ products }) => {
  const [cart, cartDispatch] = useReducer(cartReducer, initCart)
  return (
    <POSContext.Provider value={{cart, cartDispatch, products}}>
      <div className='products'>
        { products.map(product => {
          const quantity = get(
            find(cart.products, ['id', product.id])
          , 'quantity', 0)
          return <ProductButton key={`product-btn-${product.id}`} product={product} quantity={quantity}/>
         }) }
      </div>
      <div className='cart'>
        <ul>
          { cart.products.map(product => (
            <li key={`cart-product-${product.id}`}>{ product.name } - { product.quantity }</li>
          ))}
        </ul>
        <p>ยอดรวม: { sumBy(cart.products, product => product.price * product.quantity) }</p>
      </div>
      <style jsx>{`
        .products {
          width: 70%
          display: inline-block
        }
        .cart {
          width: 30%
          display: inline-block
        }
    `}</style>
    </POSContext.Provider>
  )
}

Index.getInitialProps = async ({ req }) => {
  const db = firebase.firestore()
  const products = await db.collection("products").get()
    .then(querySnapshot => {
      const ps = []
      querySnapshot.forEach(doc => (
        ps.push({ id: doc.id, ...doc.data() })
      ))
      return ps
    })
    .catch(error => {
      console.log("Error getting documents: ", error)
    })
  console.info(products)
  return { products }
}

export default Index