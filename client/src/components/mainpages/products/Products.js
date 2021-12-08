import React,{useContext,useReducer} from 'react'
import './product.css'
import { GlobalState } from '../../../GlobalState'
import ProductItem from '../productItem/ProductItem'
// import Filter from './Filter'
const Products = () => {
    const state = useContext(GlobalState)
    const [products] = state.productApi.products
// console.log(products)
// console.log(state)

const [
    { showInventoryAll, showFastDeliveryOnly, sortBy },
    dispatch
  ] = useReducer(
    function reducer(state, action) {
      switch (action.type) {
        case "TOGGLE_INVENTORY":
          return (state = {
            ...state,
            showInventoryAll: !state.showInventoryAll
          });

        case "TOGGLE_DELIVERY":
          return (state = {
            ...state,
            showFastDeliveryOnly: !state.showFastDeliveryOnly
          });
        case "SORT":
          return {
            ...state,
            sortBy: action.payload
          };
        default:
          return state;
      }
    },
    {
      showInventoryAll: true,
      showFastDeliveryOnly: false,
      sortBy: null
    }
  );

  function getSortedData(productList, sortBy) {
    if (sortBy && sortBy === "PRICE_HIGH_TO_LOW") {
      return productList.sort((a, b) => b["price"] - a["price"]);
    }

    if (sortBy && sortBy === "PRICE_LOW_TO_HIGH") {
      return productList.sort((a, b) => a["price"] - b["price"]);
    }
    return productList;
  }

  function getFilteredData(
    productList,
    { showFastDeliveryOnly, showInventoryAll }
  ) {
    return productList
      .filter(({ fastDelivery }) =>
        showFastDeliveryOnly ? fastDelivery : true
      )
      .filter(({ inStock }) => (showInventoryAll ? true : inStock));
  }

  const sortedData = getSortedData(products, sortBy);
  const filteredData = getFilteredData(sortedData, {
    showFastDeliveryOnly,
    showInventoryAll
  });


    return (
       <>
       
       <fieldset className="sortstyle">
        <legend>Sort By</legend>
        <label>
          <input
            type="radio"
            name="sort"
            
            onChange={() =>
              dispatch({ type: "SORT", payload: "PRICE_HIGH_TO_LOW" })
            }
            checked={sortBy && sortBy === "PRICE_HIGH_TO_LOW"}
          ></input>{" "}
          Price - High to Low
        </label>
        <label>
          <input
            type="radio"
            name="sort"
            style={{marginLeft:"1rem"}}
            onChange={() =>
              dispatch({ type: "SORT", payload: "PRICE_LOW_TO_HIGH" })
            }
            checked={sortBy && sortBy === "PRICE_LOW_TO_HIGH"}
          ></input>{" "}
          Price - Low to High
        </label>
      </fieldset>

      <fieldset className="sortstyle" style={{ marginTop: "1rem" }}>
        <legend> Filters </legend>
        <label>
          <input
            type="checkbox"
            checked={showInventoryAll}
            onChange={() => dispatch({ type: "TOGGLE_INVENTORY" })}
          />
          Include Out of Stock
        </label>

        <label>
          <input
            type="checkbox"
            checked={showFastDeliveryOnly}
            style={{marginLeft:"1rem"}}
            onChange={() => dispatch({ type: "TOGGLE_DELIVERY" })}
          />
          Prime Delivery Only
        </label>
       
      </fieldset>


       
        <div className="products">
            {filteredData.map(product=>{
               return <ProductItem key={product._id} product={product}/>
           })} 
           
        </div>
       </>
    )
}

export default Products
