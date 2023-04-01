import React from 'react'
import "./productCard.css"
import {Link} from 'react-router-dom'
import ShoppingCartItem from '../shoppingCart/ShoppingCart'
import {  useDispatch, useSelector} from 'react-redux'
import { itemAdded } from '../../feautures/cart/cartSlice';
import { Button } from '@mui/material'
const ProductCard = ({name,description,price,image,id}) => {
  const item= {name,description,price,image,id}
  const dispatch= useDispatch()
  const cart= useSelector((state)=>state.cart)

  const addtoCart= (product)=>{
    const{name, price,image,id}=product
 
 
dispatch((itemAdded({name,price,image,id})))


  }

  return (


    <div className="item" style={{width:"130.4px"}} >
    
      <div className="imageBox"><img class="image" src={image} alt={name}/></div>

      <div style={{display:'flex',flexDirection:'column'}} className="itemContent">
      
        <p style={{fontSize:'13px'}}>{name.substring(0,15)}
      <p>{item.price}</p>
      
      </p>
      
        {/* { <p>{description}</p> } */}

        <Button className="itemFt" sx={{  paddingBlock:'20px'}} component={Link} to={`/product/${item.id}`}>View more</Button>
        <div style={{marginTop:0}} className='itemFt'>
        
          <button 
          onClick={()=>{
            addtoCart(item)
          }}
          className='addtocart'>Add to cart</button>
     
        </div>
        <Button sx={{  paddingBlock:'20px'}} component={Link} to={`/product/${item.id}`}>View more</Button>

      </div>
    </div>
 
    
  )
}

export default ProductCard