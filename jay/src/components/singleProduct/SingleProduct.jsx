import React from 'react'
import './singleProduct.css'
import { products } from '../../data'
import {useParams} from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { itemAdded } from '../../feautures/cart/cartSlice';

const SingleProduct = () => {
    const {id}=useParams()
    const dispatch= useDispatch()
    const cart= useSelector((state)=>state.cart)
  

    const addtoCart= (product)=>{
      const{name, price,image,id}=product
   
   
  dispatch((itemAdded({name,price,image,id})))
  
  
    }
    const product=products.find((product)=>product.id==id)
  
  return (
    <div className='containerInfo'>
      <button className = "navi" onClick ={()=>window.history.back()} >
        <svg class="inline-icon inline-icon--xx-small inline-icon__outline inline-icon__outline--black" viewBox="0 0 24 24">
<path stroke-miterlimit="10" d="M17 2L7 12l10 10" vector-effect="non-scaling-stroke"></path>

</svg>
        Back</button>
      <div className="imageContainer">
        <img className="productImage"src={product.image} alt={product.name}></img>
      </div>
      <div className="detailsContainer">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p className="price">{product.price}</p>
                  <button 
          onClick={()=>{
            addtoCart(product)
          }}
          className='addtocart'>Add to cart</button>
      
      </div>

    </div>
  )
}

export default SingleProduct