import React from 'react'
import generateThumbnail from '../generateThumbnail';
import {Link} from "react-router-dom"
import { Stack,Card,CardMedia,CardContent,CardActions,Typography,Button,Alert } from '@mui/material'
const EbookCard = ({url,name,id,user}) => {
  //const{name,_id,url}=cardInfo;
  const[imgUrl,setImgUrl]=React.useState('')

  const seedNumber = Math.floor(Math.random() * 1000) + 1;
const downloadUrl=url

const getThumb=async ()=>{
  try{
    const img=await generateThumbnail(downloadUrl)
   
    setImgUrl(img)
  
  }
  catch(e){

  }
}
React.useEffect(()=>{

getThumb()

},[])
  return (
    
    <Card sx={{
        backgroundColor:'white',
        marginY:"10px",
 width:{xs:"90vw",sm:200},
 marginX:{xs:'5vw'},

        boxShadow: '0 4px 4px rgba(0, 255, 0, 0.5)'
      }}>
  <CardMedia
        component="img"
        height="194"
        image={imgUrl}
        alt={name}
        width='200px'
      />
   <CardContent>
        <Typography component="p" variant="p" color="text.secondary">
{name}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        
        {!user && <Alert severity="error">Login to download!</Alert>}
       {user &&<Typography onClick={async ()=>{
//make request
const items={name:name,price:1}

 const res=await fetch('/order/create',
 {
  method:'POST',
 body:JSON.stringify(items),
 'content-type':'application/json'
 }

 )
 if(res.status === 200 || 201){
  setGift(true)
alert(`sucess you purchased a book`)
 }
if(!user){
  alert(`login to purchase!`)
}
        }} disabled={!user} id='buy-now' sx={{textDecoration:'none', backgroundColor:'green', color:'white',padding:'5px',cursor:'pointer'}} component='a' href={downloadUrl} download={`${name}.pdf`}  >Purchase</Typography> } 



      </CardActions>

    </Card>
  )
}

export default EbookCard