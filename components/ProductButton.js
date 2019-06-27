import React, { useContext } from 'react'

import POSContext from './POSContext'

const ProductButton = ({ product, quantity }) => {
  const { cartDispatch } = useContext(POSContext)
  const onClick = (_e) => {
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
  return(
    <div className='product_button' onClick={onClick}>
      <p className='product--name'>{ product.name }</p>
      <p className='product--price'>{ product.price }</p>
      { quantity > 0 && (
        <p>{quantity}</p>
      )}
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

export default ProductButton