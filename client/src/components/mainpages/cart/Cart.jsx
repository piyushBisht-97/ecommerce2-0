import React,{useContext,useEffect,useState} from 'react'
import {GlobalState} from '../../../GlobalState'
import { Link } from 'react-router-dom'

import './cart.css'

const Cart = () => {
    
    const state = useContext(GlobalState)
    const [cart,setCart] = state.userApi.cart
    const [total,setTotal] = useState(0)
    

    useEffect(()=>{
        const getTotal = () =>{
            const total = cart.reduce((prev,item) =>{
                return prev + (item.price *item.quantity)
            },0)
            setTotal(total)
        }
        getTotal()
    },[cart])
    const increment = (id) =>{
        cart.forEach(item =>{
            if(item._id === id){
                item.quantity +=1
            }
        })
        setCart([...cart])
    }
    const decrement = (id) =>{
        cart.forEach(item =>{
            if(item._id === id){
                item.quantity === 1 ? item.quantity =1 : item.quantity -= 1
            }
        })
        setCart([...cart])
    }
    const removeProduct = id =>{
        if(window.confirm("Do you want to delete this product")){
            cart.forEach((item,index)=>{
                if(item._id=== id){
                    cart.splice(index,1)
                }
            })
            setCart([...cart])
        }
    }

    if(cart.length ===0)
    return <h2 style={{textAlign:"center",fontSize:"5rem"}}>Cart Empty</h2>
    
    
    return (
        <div>
            {
           cart.map((product) =>  {


               return  <div className="detail cart">
               <img src={product.images} alt="" className="img_container"/>

           <div className="box-detail">
           <h2>{product.title}</h2>

               <span> ₹ {product.price * product.quantity}</span>
               <p>{product.description}</p>
               <p>{product.content}</p>
               
               <div className="amount">
                <button onClick={()=> decrement(product._id)}> - </button>
                <span>{product.quantity}</span>
                <button onClick={()=>increment(product._id)}> + </button>

               </div>
               <div className="delete" onClick={()=> removeProduct(product._id)}> X </div>
           </div>
           </div>
           
    
           })
                
           }
           <div className="total">
               <h3>Total: ₹ {total}</h3>
               <Link to="/payment">Payment</Link>
           </div>
        </div>
    )
}

export default Cart
