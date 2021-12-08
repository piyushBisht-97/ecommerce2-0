import React,{useContext,useEffect,useState} from 'react'
import {GlobalState} from '../../../GlobalState'
import { Link } from 'react-router-dom'
import axios from "axios"
import './cart.css'

const Cart = () => {
    
    const state = useContext(GlobalState)
    const [cart,setCart] = state.userApi.cart
    const [token] = state.token
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

const addToCart = async () =>{
    await axios.patch('/user/addcart',{cart},{
        headers:{Authorization:token}
    })
}

    const increment = (id) =>{
        cart.forEach(item =>{
            if(item._id === id){
                item.quantity +=1
            }
        })
        setCart([...cart])
        addToCart()
    }
    const decrement = (id) =>{
        cart.forEach(item =>{
            if(item._id === id){
                item.quantity === 1 ? item.quantity =1 : item.quantity -= 1
            }
        })
        setCart([...cart])
        addToCart()
    }
    const removeProduct = id =>{
        if(window.confirm("Do you want to delete this product")){
            cart.forEach((item,index)=>{
                if(item._id=== id){
                    cart.splice(index,1)
                }
            })
            setCart([...cart])
            addToCart()
        }
    }

    if(cart.length ===0)
    return <h2 style={{textAlign:"center", marginTop:"10rem"}}>Don't be a miser buy something for your loved ones .........</h2>
    
    const paymentdone = ()=>{
   alert("Your order has been places and will be delivered to you")
   setCart([])
   
    }
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
               <Link to="/payment" onClick={paymentdone}>Payment</Link>
           </div>
        </div>
    )
}

export default Cart
