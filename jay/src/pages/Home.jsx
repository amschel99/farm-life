import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import Products from '../components/Products/Products'
import {Link,useNavigate} from "react-router-dom"
import { Outlet } from 'react-router-dom'
import SocialFlow from '../components/socialFlow/SocialFlow'
const Home = ({productsData,setProductsData,user,setUser}) => {
  const navigate=useNavigate('')
  React.useEffect(()=>{

if(!user){
navigate("/login")
}
  },[user])
  return (

    <div style={{maxWidth:'100%'}}>
      {/* <div className="company"><h1 className="coName">Jay Plumbing and Irrigation</h1></div> */}
    <Navbar user={user} setUser={setUser} productsData={productsData} setProductsData={setProductsData}/>
     <Outlet/>

     <Footer/>
    </div>
   


  
  )
}

export default Home