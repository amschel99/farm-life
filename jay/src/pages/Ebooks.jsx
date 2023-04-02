import React, { useEffect, useState } from 'react'
import EbookCard from '../components/EbookCard'
import { Box, Typography,Stack } from '@mui/material';
import axios from 'axios';

const Ebooks = ({ user }) => {
  const [cardInfos, setCardInfos] = useState(null);
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    const url = 'https://veestream.tech/videos';
    const headers = { apiKey: import.meta.env.VITE_API_KEY };
    axios.get(url, { headers })
      .then((response) => {
        setCardInfos(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });

    axios.get('/order/coins/get', { params: { user: user } })
      .then((response) => {
        setCoins(response.data.coins);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, [user]);

  console.log(cardInfos);

  return (
    <Stack direction="column">

   
    <Typography sx={{textAlign:'center'}} component={'h4'} variant='h4'>Total coins in your account: {coins}</Typography>
    <Box sx={{ width: '100vw', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>

      {cardInfos && cardInfos.map((cardInfo) => {
        return <EbookCard key={cardInfo._id} user={user} url={cardInfo.url} name={cardInfo.name} id={cardInfo._id} />
      })}
    </Box>
     </Stack>
  );
};

export default Ebooks;
