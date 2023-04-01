import React, { useEffect, useState } from 'react'
import EbookCard from '../components/EbookCard'
import { Box } from '@mui/material';
import axios from 'axios';

const Ebooks = ({user}) => {
  const [cardInfos,setCardInfos]=React.useState(null);
    
   


    useEffect(() => {
      const url = 'https://veestream.tech/videos';
    
      const headers = {
        apiKey:import.meta.env.VITE_API_KEY,
      };
    
      axios.get(url, { headers })
        .then((response) => {
//alert(JSON.stringify(response.data))
          setCardInfos(response.data);
         
        })
        .catch((error) => {
          console.log(error.response.data);
        });
  

    
    
    }, []);
    
    console.log(cardInfos);
    
  return (
  <Box sx={{width:'100vw', display:'flex',flexWrap:'wrap',justifyContent:"space-around"}}>
    {cardInfos && cardInfos.map((cardInfo)=>{
       return <EbookCard  key={cardInfo._id} user={user} url={cardInfo.url} name={cardInfo.name} id={cardInfo._id}/> 
    })}
  </Box>
  )
}

export default Ebooks