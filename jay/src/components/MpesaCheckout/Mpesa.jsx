import React from 'react'
import {Box,Stack,TextField,Button, Typography,Alert} from "@mui/material"
import { itemRemoved,incrementQuantity,decrementQuantity,setQuantity } from '../../feautures/cart/cartSlice';
import {  useDispatch, useSelector} from 'react-redux'
import PayIcon from "@mui/icons-material/Payment"
import {useNavigate} from 'react-router-dom'
 const MpesaCheckout= ({user})=>{
  const [congrats,setCongrats]=React.useState(false)
    const cart= useSelector((state)=>state.cart)
  const{totalItems, totalPrice,items}=cart
  const navigate= useNavigate()
  const [trnx,setTrnx]=React.useState(null)
    const[mpesaNumber,setMpesaNumber]=React.useState(null)
 
    const [coins, setCoins] = React.useState();
    const [points, setPoints]=React.useState()

    React.useEffect(() => {
      async function fetchCoins() {
        const response = await fetch(`/order/coins/get?user=${user}`);
        const data = await response.json();
     setPoints(Number(data.points))
        setCoins(Number(data.coins));
      }
  
      fetchCoins();
    }, []);
    
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
{congrats && <Alert severity='success'>Congrats, you have earned 5 coins and 3 points</Alert>}
     
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
const dataToSend={items,user,price:totalPrice}
alert(JSON.stringify(dataToSend))
await fetch("/order/create",{
  method:'POST',

  body:JSON.stringify(dataToSend),
  headers: { 'Content-Type': 'application/json' },
})
const updateRes=await fetch('/order/coins/update', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ user, coins:Number(coins)+5,points:Number(points)+3 })
});
if(updateRes.status===200){
  setCongrats(true)
}
 setTimeout(()=>{
  
  navigate('/success')
},15000)
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