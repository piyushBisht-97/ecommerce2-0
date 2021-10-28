import React,{useContext,useState,useEffect} from 'react'
import { useParams,Link } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import ProductItem from '../productItem/ProductItem'
import './detailProduct.css'

function DetailProduct() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [products] = state.productApi.products
    const [detailProduct,setDetailProduct] = useState([])
    
useEffect(()=>{
    if(params){
        products.forEach(product =>{
            if(product._id === params.id) setDetailProduct(product)
        })
    }
},[params,products])
if(detailProduct.length===0) return null;
    return (
        <>
        <div className="detail">
            <img src={detailProduct.images} alt=""/>
        <div className="box-detail">
            <div className="row">
             <h2>{detailProduct.title}</h2>
             <h6>{detailProduct.product_id}</h6>
            </div>
            <span> ₹ {detailProduct.price}</span>
            <p>{detailProduct.description}</p>
            <p>{detailProduct.content}</p>
            <p>Sold :{detailProduct.sold}</p>
            <Link to="/cart" className="cart">Buy NOw</Link>
        </div>

        </div>
        <div>
<h2>Related Products</h2>
<div className="products">
{products.map(product =>{
    return product.category === detailProduct.category ? 
    <ProductItem key={product._id} product={product}/> :null
})}

</div>

        </div>
        </>
    )
}

export default DetailProduct
