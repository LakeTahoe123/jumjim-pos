import React, { useContext } from 'react'

import POSContext from './POSContext'

const ProductButton = ({ product, quantity }) => {
  const { cartDispatch } = useContext(POSContext)
  const addToCart = (_e) => {
    cartDispatch({
      type: '@POS/ADD_TO_CART',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1
      }
    })
  }

  const removeFromCart = (_e) => {
    cartDispatch({
      type: '@POS/REMOVE_FROM_CART',
      payload: {
        id: product.id,
        quantity: 1
      }
    })
  }
  return(
    <div className='product_button'>
      <div className='product_card' onClick={addToCart}>
        <p className='product--name'>{ product.name }</p>
        <p className='product--price'>{ product.price }</p>
        { quantity > 0 && (<p>{quantity}</p>) }
      </div>
      { quantity > 0 && (
        <div className='remove' onClick={removeFromCart}>
          <p>ลบ</p>
        </div>
      ) }
      <style jsx>{`
          .product_button {
            width: 100px;
            height: 100px;
            display: inline-block;
            border: 1px solid;
            padding: 10px;
            margin: 8px;
          }
          .remove {
            z-index: 99;
          }
      `}</style>
    </div>

  )
}

export default ProductButton