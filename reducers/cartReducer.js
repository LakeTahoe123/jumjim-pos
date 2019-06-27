import update from 'immutability-helper'
import find from 'lodash/find'
import findIndex from 'lodash/findIndex'

export const initCart = { products: [] }

const cartReducer = (state, action) => {
  console.log('cartReducer', state)
  switch (action.type) {
    case '@POS/ADD_TO_CART':
      const index = findIndex(state.products, ['id', action.payload.id])
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
        newProducts = update(state.products, {
          [index]: { quantity: { $set: state.products[index].quantity + 1 } }
        })
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