import axios from 'axios'
import  { useState,useEffect } from 'react'


const UserApi = (token) => {
    const [cart,setCart] = useState([])
    const [wishlist,setWishlist] = useState([])
    const [isLogged,setIsLogged] = useState(false)
    

useEffect(() => {
   if(token){
       const getUser = async () =>{
           try{
const res = await axios.get('/user/infor',{
    headers:{Authorization:token}
})
setIsLogged(true)
setCart(res.data.cart)
console.log(res)
           }catch(err){
alert(err.response.data.msg)
           }
       }
       getUser()
   } 
   
        
    
}, [token])

const addCart = async (product) =>{
    if(!isLogged) return alert("Please login to continue buying")

    const check = cart.every(item =>{
return item._id !== product._id
    })
    if(check){
        setCart([...cart,{...product,quantity:1}])
        await axios.patch('/user/addCart',{cart: [...cart,{...product,quantity:1}]},{
            headers:{Authorization:token}
        })
    }else {
        alert("This product has been added to cart")
    }
}

const addWishlist = async (product) =>{
    if(!isLogged) return alert("Please login to Wishlist products")

    const check = wishlist.every(item =>{
return item._id !== product._id
    })
    if(check){
        setWishlist([...wishlist,{...product,quantity:1}])
        await axios.patch('/user/addWishlist',{wishlist: [...wishlist,{...product,quantity:1}]},{
            headers:{Authorization:token}
        })



    }else {
        alert("This product has been added to Wishlist")
    }
}

    return {
        isLogged:[isLogged,setIsLogged],
        cart:[cart,setCart],
        wishlist:[wishlist,setWishlist],
        addWishlist:addWishlist,
        addCart:addCart
    }
}

export default UserApi
