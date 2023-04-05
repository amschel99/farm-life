import React, { useEffect, useState } from 'react';
import EbookCard from '../components/EbookCard';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import axios from 'axios';

const Ebooks = ({ user }) => {
  const [cardInfos, setCardInfos] = useState(null);
  const [coins, setCoins] = useState(0);
  const [points, setPoints] = useState(0);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const url = 'https://veestream.tech/files';
    const headers = { apiKey: import.meta.env.VITE_API_KEY };
    axios.get(url, { headers })
      .then((response) => {
        setCardInfos(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });

    axios.get(`/order/coins/get?user=${user}`)
      .then((response) => {
        setCoins(response.data.coins);
        setPoints(response.data.points)
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, [user]);

  const handleFilter = (value) => {
    setFilter(value);
  };

  const filteredCardInfos = cardInfos?.filter((cardInfo) => {
    if (filter === 'All') {
      return true;
    } else if (filter === 'Meal Plans') {
      return cardInfo.name.startsWith('0-');
    } else {
      return cardInfo.name.startsWith('1-');
    }
  });

  return (
    <Stack spacing={4}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Button variant={filter === 'All' ? 'contained' : 'outlined'} onClick={() => handleFilter('All')}>
            All
          </Button>
        </Grid>
        <Grid item>
          <Button variant={filter === 'Meal Plans' ? 'contained' : 'outlined'} onClick={() => handleFilter('Meal Plans')}>
            Meal Plans
          </Button>
        </Grid>
        <Grid item>
          <Button variant={filter === 'Ebooks' ? 'contained' : 'outlined'} onClick={() => handleFilter('Ebooks')}>
            Ebooks
          </Button>
        </Grid>
      </Grid>
      <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }} component={'h4'} variant='h4'>
        Coins: {coins}
      </Typography>
      <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }} component={'h4'} variant='h4'>
        Points: {points}
      </Typography>
      <Box sx={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        {filteredCardInfos?.map((cardInfo) => {
          return <EbookCard key={cardInfo._id} user={user} url={cardInfo.url} name={cardInfo.name} id={cardInfo._id} />;
        })}
      </Box>
    </Stack>
  );
};

export default Ebooks;
