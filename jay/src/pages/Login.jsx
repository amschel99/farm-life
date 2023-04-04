import React from 'react'
import { Stack,TextField,Button, Typography,Box} from '@mui/material'
import {Link,useNavigate} from "react-router-dom"
import { auth } from '../../firebase'

const Login = ({user,setUser}) => {
  function login (email,password){
    return auth.signInWithEmailAndPassword(email,password)
}

    const[email,setEmail]=React.useState('')
  const[password,setPassword]=React.useState('')
  const navigate= useNavigate()
  return (
    <Box sx={{marginTop:'30vh'}}>
        <Typography sx={{textAlign:'center',marginY:"20px", color:'green'}} variant='h3' component='h2'>Farm Life</Typography>
   <Stack sx={{width:'50vw',marginX:"25vw"}} gap={3} direction="column">
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
<Button variant='contained' sx={{backgroundColor:'green'}}
onClick={

  async (e)=>{
    try{
      e.target.disabled=true
     const {user}= await login(email,password)
     e.target.disabled=false
     setUser(user.email)
     if(user.email==='victormunene21@gmail.com'){
     return navigate('/admin')
     }
   navigate("/")
    }
    catch(e){
alert(`${e.message}`)
    }

  }
}
>Login</Button>
<Typography component={Link} to="/signup">Are you new here? signup</Typography>
   </Stack> 
   </Box>
  )
}

export default Login

