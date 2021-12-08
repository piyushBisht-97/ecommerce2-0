import  { useEffect, useState } from 'react'
import axios from 'axios'

const ProductsApi = () => {
    const [products,setProducts] = useState([])
    // const [category, setCategory] = useState('')
    // const [sort, setSort] = useState('')
    // const [search, setSearch] = useState('')

    const getProducts = async ()=>{

        const res = await axios.get('/api/products')
       
        setProducts(res.data)
    }
    useEffect(()=>{
getProducts()
    },[])
    return {
        products :[products,setProducts],
        // category:[category, setCategory],
        // sort:[sort, setSort],
        // search:[search,setSearch]
    }
}

export default ProductsApi
