import update from 'immutability-helper'
import find from 'lodash/find'
import findIndex from 'lodash/findIndex'

export const initCart = { products: [] }

const cartReducer = (state, action) => {
  switch (action.type) {
    case '@POS/ADD_TO_CART':
      let index = findIndex(state.products, ['id', action.payload.id])
      let newProducts = []
      if(index == -1) {
        newProducts = update(state.products, {
          $push: [{
            id: action.payload.id,
            name: action.payload.name,
            price: action.payload.price,
            quantity: action.payload.quantity,
          }]
        })
      } else {
        let newQuantity = state.products[index].quantity + action.payload.quantity
        newProducts = update(state.products, {
          [index]: { quantity: { $set: newQuantity } }
        })
      }
      return {
        ...state,
        products: newProducts
      }
    case '@POS/REMOVE_FROM_CART':
      index = findIndex(state.products, ['id', action.payload.id])
      newProducts = []
      if(index == -1) {
        newProducts = state.products
      } else {
        let newQuantity = state.products[index].quantity - action.payload.quantity
        if(newQuantity > 0) {
          newProducts = update(state.products, {
            [index]: { quantity: { $set: newQuantity } }
          })
        } else {
          if(state.products.length == 1) {
            newProducts = []
          } else {
            newProducts = update(state.products, { $splice: [[index, index]] })
          }
        }
      }
      return {
        ...state,
        products: newProducts
      }
    default:
      throw new Error();
  }
}

export default cartReducer