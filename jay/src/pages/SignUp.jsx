import React from 'react'
import { Stack,TextField,Button, Typography,Box,Alert} from '@mui/material'
import {Link,useNavigate} from "react-router-dom"

import { auth } from '../../firebase'
const SignUp = ({user,setUser}) => {

  const[email,setEmail]=React.useState('')
  const[password,setPassword]=React.useState('')
  const[err,setErr]=React.useState(null)
  const navigate= useNavigate()
  function signUp(email,password){
    return   auth.createUserWithEmailAndPassword(email,password)
  }
  return (
    <Box sx={{marginTop:'30vh'}}>
        <Typography sx={{textAlign:'center',marginY:"20px", color:'green'}} variant='h3' component='h2'>Farm Life</Typography>
   <Stack sx={{width:'50vw',marginX:"25vw"}} gap={3} direction="column">
{err&&<Alert severity='error'>{err}</Alert>}
  <TextField
      label="Email"
      type="email"
      fullWidth
      onChange={(e)=>setEmail(e.target.value)}
    />
  <TextField
      label="Password"
      type="password"
      fullWidth
      onChange={(e)=>setPassword(e.target.value)}
    />
<Button variant='contained' sx={{backgroundColor:'green'}} onClick={
  async (e)=>{
    try{
   const res=   await fetch('/order/new/user',{
        method:'POST',
        body:JSON.stringify({user:email}),
      headers:{
        'Content-Type':'application/json'
      }

      })
     
      if(res.status!==201){
        return alert(`something went wrong!`)
      }
      else{

        e.target.disabled=true
     const {user}= await signUp(email,password)
     e.target.disabled=false
     setUser(user.email)
    navigate("/")
  }
    }
    catch(e){
setErr(e.message)
    }

  }
}>Signup</Button>
<Typography component={Link} to="/login">Already a user? login</Typography>
   </Stack> 
   </Box>
  )
}

export default SignUp
