import React from 'react'
import { useContext } from 'react'

import './productItem.css'
import {Link} from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'

const ProductItem = ({product}) => {

    const state = useContext(GlobalState)
    const addCart = state.userApi.addCart
    
    return (
        <div className="product_card">
            <img src={product.images} alt=""/>
<div className="product_box">
    <h2 title={product.title}>{product.title}</h2>
    <span> ₹ {product.price}</span>
    <p> {product.description}</p>
</div>
<div className="row_btn">
<Link id="btn_buy" to ="#!" onClick={()=> addCart(product)}>BUY</Link>


<Link id="btn_buy" to={`detail/${product._id}`}>View</Link>
</div>

        </div>
    )
}

export default ProductItem
