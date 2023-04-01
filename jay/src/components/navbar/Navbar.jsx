import React, {useState} from 'react'
import './navbar.css'
import { SearchBar } from '../searchBar/SearchBar'
import { Box,Typography,Button,Modal } from '@mui/material'
import SearchIcon from "@mui/icons-material/Search";
import CartIcon from '@mui/icons-material/ShoppingCart'
import { products} from '../../data'
import {Link} from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import ShoppingCartItem from '../shoppingCart/ShoppingCart';
import { MobileSearchBar } from '../searchBar/MobileSearch';
const Navbar = ({productsData,setProductsData,user}) => {
  const dispatch= useDispatch()
  const cart= useSelector((state)=>state.cart)
  const[open,setOpen]=useState(false)
  const[openModal,setOpenModal]=useState(false)
  
  return (

    <nav className="navigation">
      
      <div className="company"><h2 className="coName">Farm Life
   
      </h2>

      </div>
   
   
      <div className='navlinks'><div className="navigation__panel">
        <div className="navigation__pane">
          <div>

          <ul>
           
            <li>
            
            <Typography  component={Link} to='/ebooks'>Educational ebooks</Typography>
      </li>
      <li>
            
            <Typography  component={user?"p":Link} to='/login'>{user?user:'Login'}</Typography>
      </li>
            </ul>
          
          <button onClick={()=>setOpenModal(true)} className="crt">

            <CartIcon/>
              <p >{cart.totalItems} </p>
         
              
              </button>
              </div>

        <Box sx={{display:{xs:"none",sm:"block"}}} className='srch'>

     <SearchBar productsData={productsData} setProductsData={setProductsData}/>
 
 
 

        
         
            </Box>
          </div>
        </div>
      </div>
 
      <Modal
  open={openModal}
  onClose={()=>setOpenModal(false)}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
    <ShoppingCartItem/>
  
</Modal>
<Box sx={{display:{xs:"block",sm:'none'},marginTop:'20px'}} className="company">

  
<MobileSearchBar productsData={productsData} setProductsData={setProductsData}/>

 </Box>
    </nav>
  )
}

export default Navbar