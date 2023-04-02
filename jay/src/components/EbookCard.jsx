import React from 'react';
import generateThumbnail from '../generateThumbnail';
import { Link } from 'react-router-dom';
import {
  Stack,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Alert,
} from '@mui/material';

const EbookCard = ({ url, name, id, user }) => {
  const [imgUrl, setImgUrl] = React.useState('');
  const [coinBalance, setCoinBalance] = React.useState(0);
  const [isPurchaseDisabled, setIsPurchaseDisabled] = React.useState(true);

  const downloadUrl = url;

  const fetchCoinBalance = async () => {
    try {
      const response = await fetch(`/order/coins/get?user=${user}`);
      const data = await response.json();
      setCoinBalance(Number(data.coins));
     
    } catch (error) {
      console.error(error);
    }
  };

  const updateCoinBalance = async () => {
    try {
      if(Number(coinBalance)>=5){

     
      const response = await fetch('/order/coins/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, coins: Number(coinBalance) - 5 }),
      });
      const data = await response.json();
      alert(JSON.stringify(data))
      setCoinBalance(data.coins);
      window.location.href = `${downloadUrl}?download=true`;
    }
    else{
     return alert(`you do not have enough balance!`)
    }

    } catch (error) {
      console.error(error);
    }
  };

  const getThumb = async () => {
    try {
      const img = await generateThumbnail(downloadUrl);
      setImgUrl(img);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchCoinBalance();
    getThumb();
  }, []);

  React.useEffect(() => {
    setIsPurchaseDisabled(Number(coinBalance) < 5);
  }, [coinBalance]);

  const handlePurchaseClick = async () => {
    try {
      await updateCoinBalance();

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card
      sx={{
        backgroundColor: 'white',
        marginY: '10px',
        width: { xs: '90vw', sm: 200 },
        marginX: { xs: '5vw' },
        boxShadow: '0 4px 4px rgba(0, 255, 0, 0.5)',
      }}
    >
      <CardMedia component="img" height="194" image={imgUrl} alt={name} width="200px" />
      <CardContent>
        <Typography component="p" variant="p" color="text.secondary">
          {name}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {!user && <Alert severity="error">Login to download!</Alert>}
        {user && (
          <Typography
            disabled={isPurchaseDisabled}
            id="buy-now"
            sx={{
              textDecoration: 'none',
              backgroundColor: 'green',
              color: 'white',
              padding: '5px',
              cursor: isPurchaseDisabled ? 'not-allowed' : 'pointer',
            }}
            component="a"
            href="#"
            onClick={isPurchaseDisabled?null:handlePurchaseClick}
          >
            Purchase
          </Typography>
        )}
      </CardActions>
    </Card>
  );
};

export default EbookCard;
