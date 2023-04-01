import React from 'react'
import {Box,Stack,TextField,Button, Typography,Alert} from "@mui/material"
import { itemRemoved,incrementQuantity,decrementQuantity,setQuantity } from '../../feautures/cart/cartSlice';
import {  useDispatch, useSelector} from 'react-redux'
import PayIcon from "@mui/icons-material/Payment"
 const MpesaCheckout= ()=>{
    const cart= useSelector((state)=>state.cart)
  const{totalItems, totalPrice,items}=cart
  const [trnx,setTrnx]=React.useState(null)
    const[mpesaNumber,setMpesaNumber]=React.useState(null)
    const getTrnxDetails= async ()=>{
        try{
const res=await fetch("/stk/details")
const data= await res.json()
if(data){
    
}
setTrnx(data)
alert(`payment was a success ${JSON.stringify(data)}`)
        }
        catch(e){
alert(e.message)
        }
    }
    const isValidMpesaNumber = (mpesaNumber) => {
        const mpesaRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/g; // Regex for valid MPESA numbers
        return mpesaRegex.test(mpesaNumber);
      };
      const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
          if (isValidMpesaNumber(e.target.value)) {
      
            setMpesaNumber(e.target.value);
          } else {
        alert(`enter a valid mpesa number`)
          ;
          }
        }
      };
    
      const handleChange = (e) => {
        setMpesaNumber(e.target.value);
      };
 
    return <Box sx={{height:'60vh',marginTop:'100px'}}>
    
    <Stack direction="column">
        <Typography sx={{textAlign:'center'}} variant="h3">Checkout Via Mpesa</Typography>
       
        <Stack direction="column">

     
    <TextField
    sx={{marginTop:'100px', marginLeft: '5px',
    height: '10px',
  }}
      label="Enter MPESA Number"
      onChange={handleChange}
      onKeyPress={handleKeyPress}
    
    />
<Button id='btn' sx={{backgroundColor:'blue', color:'white', marginLeft:'10px',marginTop:'60px'}} component={'button'}  startIcon={<PayIcon/>} disabled={!mpesaNumber}

onClick={async ()=>{

if(mpesaNumber){


const res= await fetch("/stk", {
method:'POST',
headers:{
 "Content-Type":'application/json'
},
body:JSON.stringify({phone:mpesaNumber,amount:totalPrice})
})

if(res.status===200){
 alert(`check your phone for an mpesa prompt`)
 if(!trnx){


 setInterval(()=>{
//getTrnxDetails()
 },1000)
}

}
if(res.status!==200){
return alert(`failed!your mpesa number might be wrong`) 
}
}
else{
alert(`mpesa number wrong!`)
}
}}


>Pay By Mpesa</Button>
{trnx&&<Alert severity="success">Transaction was succesful!</Alert>}
</Stack>
    </Stack>
    
    </Box>
}
export default MpesaCheckout