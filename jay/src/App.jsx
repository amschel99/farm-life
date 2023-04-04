import React from 'react'
import {Route, Routes,BrowserRouter} from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Products from './components/Products/Products'
import Mpesa from "./components/MpesaCheckout/Mpesa"
import Ebooks from './pages/Ebooks'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Admin from './pages/Admin'
import Success from './pages/Success'
import DownloadReport from './components/DownloadReport'

import SingleProductPage from './pages/SingleProductPage'
const App = () => {
  const[ user, setUser]=React.useState(null)
  const [products,setProducts]=React.useState([])
  return (
  
   <BrowserRouter>
   <Routes>

    <Route  path='/' element={<Home setUser={setUser} user={user} productsData={products} setProductsData={setProducts}/>}>

<Route index element={<Products productsData={products} setProductsData={setProducts}/>}></Route>
      <Route  path='/contact' element={<Contact/>}></Route>

      <Route  path='/product/:id' element={<SingleProductPage/>}></Route>
    </Route>
    <Route  path='/checkout' element={<Mpesa user={user}/>}></Route>
    <Route path='/ebooks' element={<Ebooks user={user}/>}></Route>
    <Route path='/login' element={<Login user={user} setUser={setUser}/>}></Route>
    <Route path='/signup' element={<SignUp user={user} setUser={setUser}/>}></Route>
    <Route path='/admin' element={<Admin/>}></Route>
    <Route path='/report' element={<DownloadReport/>}></Route>
    <Route path='/success' element={<Success user={user}/>}></Route>
   </Routes>
   </BrowserRouter>
   

  )
}

export default App