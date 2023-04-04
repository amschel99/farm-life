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
  const [pointsBalance,setPointsBalance]=React.useState(0)
  const [isPurchaseDisabled, setIsPurchaseDisabled] = React.useState(true);
const[isMealDownloadDisabled, setIsMealDownloadDisabled]=React.useState(true)
  const downloadUrl = url;

  const fetchCoinBalance = async () => {
    try {
      const response = await fetch(`/order/coins/get?user=${user}`);
      const data = await response.json();
      setCoinBalance(Number(data.coins));
      setPointsBalance(Number(data.points))
     
    } catch (error) {
      console.error(error);
    }
  };
  const updatePointsBalance = async () => {
    try {
      if(Number(pointsBalance)>=3){

     
      const response = await fetch('/order/coins/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user,coins:coinBalance, points: Number(pointsBalance) - 3 }),
      });
      const data = await response.json();
    
   
      setPointsBalance(data.points)
      window.open(`${downloadUrl}?download=true`, '_blank');

    }
    if(Number(pointsBalance)<3){
      alert('insufficient points to download a meal plan')
    }
    
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
        body: JSON.stringify({ user,points:pointsBalance, coins: Number(coinBalance) - 5 }),
      });
      const data = await response.json();
   
      setCoinBalance(data.coins);
      window.open(`${downloadUrl}?download=true`, '_blank');
    }
    if(Number(coinBalance)<5){
      alert('insufficient coins to download an ebook')
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
    setIsMealDownloadDisabled(Number(pointsBalance)<3)
  }, [coinBalance,pointsBalance]);

  const handlePurchaseClick = async () => {
    try {
      if(name.startsWith('1-') && Number(coinBalance)>=5){
        await updateCoinBalance();
      }
      if(name.startsWith("1-") && Number(pointsBalance)>=3){
        // update points balance
        await updatePointsBalance();
      }
      else{
        alert("insufficient coins/points for the download")
      }
      
     

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
      <Typography component="h6" variant="h6" color="text.secondary">
          {name.startsWith('0-')?"Meal Plan":"Ebook"}
        </Typography>
        <Typography component="p" variant="p" color="text.secondary">
          {name}
        </Typography>
     
      </CardContent>
      <CardActions disableSpacing>
        {!user && <Alert severity="error">Login to download!</Alert>}
        {user && (
          <Typography
            disabled={name.startsWith('1-')?isPurchaseDisabled:isMealDownloadDisabled}
            id="buy-now"
            sx={{
              textDecoration: 'none',
              backgroundColor: 'green',
              color: 'white',
              padding: '5px',
              cursor:((name.startsWith('1-') && isPurchaseDisabled) ||(name.startsWith('0-') & isMealDownloadDisabled)) ? 'not-allowed' : 'pointer',
            }}
            component="a"
            href="#"
            onClick={handlePurchaseClick}
          >
            Purchase
          </Typography>
        )}
      </CardActions>
    </Card>
  );
};

export default EbookCard;
