import React,{useContext} from 'react'
import './wishlist.css'
import { GlobalState } from '../../../GlobalState'
import { Link } from 'react-router-dom'
const Wishlist = () => {
    const state = useContext(GlobalState)
    const [wishlist,setWishlist] = state.userApi.wishlist
    const addCart = state.userApi.addCart
    // const [cart,setCart] = state.userApi.cart
const filterWish =(list)=>{
const wish = wishlist.filter((item)=> item._id !== list)
   setWishlist(wish)
console.log(list._id)
console.log(wish)
console.log(wishlist)

}
    if(wishlist.length === 0)
    return <h2 style={{textAlign:"center",marginTop:"10rem"}}>Wishlist products so that you can buy it at the best prices.........</h2>
    console.log(wishlist)
    return (
        <div style={{marginTop:"1rem"}}>
           {wishlist.map((list) => (
               <div className="product_card">
               <img src={list.images} alt=""/>
   <div className="list_box">
       <h2 title={list.title}>{list.title}</h2>
       <span> ₹ {list.price}</span>
       <p> {list.content}</p>
   </div>
   <div className="row_btn">
   <Link to="/cart" className="cartButton" onClick={()=> addCart(list)}>Buy Now</Link>
   <Link to ="/"className="wishButton" onClick={()=>filterWish(list._id)}>Remove</Link>
   
{/* //    onClick={()=> addCart(list)} */}
   {/* <button onClick={()=>filterWish(list)}>Remove</button> */}
   </div>
   
           </div>
           ))}
        </div>
    )
}

export default Wishlist
