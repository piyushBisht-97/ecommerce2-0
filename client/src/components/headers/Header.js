import React,{useContext} from 'react'
import './Header.css'
import { GlobalState } from '../../GlobalState'
import {Link} from 'react-router-dom'
import Menu from './icon/menu.svg'
import Close from './icon/close.svg'
import Cart from './icon/cart.svg'
import axios from 'axios'
const Header = () => {
    const state = useContext(GlobalState)
    const cart = state.userApi.cart
    const [isLogged,setIsLogged] = state.userApi.isLogged
const logoutUser = async () =>{
    await axios.get('/user/logout')
    localStorage.clear()
    setIsLogged(false)
}

    const loggedRouter = () =>{
return (
    <>
    <li><Link to="/history">History</Link></li>
    <li><Link to="/" onClick={logoutUser} >Logout</Link></li>
    </>
)
    }
    return (
        <header>
<div className="menu">
    <img src={Menu} alt="" width="30"/>
</div>
<div className="logo">
<h1>
    <Link to ="/">Nukkad SHop</Link>
</h1>

</div>
<ul>
    <li><Link to ="/">Products</Link></li>
{isLogged ? loggedRouter() :  <li ><Link to ="/login">Login / Register</Link></li> }

   
    <li><img src={Close} alt="" width="30" className="menu"/></li>

</ul>
<div className="cart-icon">
    <span>{cart.length}</span>
    <Link to ="/cart"><img src={Cart} alt="" width="30"/></Link>
</div>
        </header>
    )
}

export default Header
