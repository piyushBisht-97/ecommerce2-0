import React,{useContext} from 'react'
import './product.css'
import { GlobalState } from '../../../GlobalState'
import ProductItem from '../productItem/ProductItem'
const Products = () => {
    const state = useContext(GlobalState)
    const [products] = state.productApi.products
console.log(products)
console.log(state)

    return (
        <div className="products">
            {products.map(product=>{
               return <ProductItem key={product._id} product={product}/>
           })} 
           
        </div>
    )
}

export default Products
