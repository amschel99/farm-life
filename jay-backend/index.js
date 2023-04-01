const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require('mongoose');
const path=require('path')
const PostOrder=require('./routes/post')
//remember to include the correct passkey and paybill in production enviroment
const Payee= require("./routes/Routes");
require("dotenv").config();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/stk',Payee)
app.use('/order',PostOrder)
app.get('/test',(req,res)=>{
  res.send(`its working`)
})
app.use("/", express.static(path.join(__dirname, "..", "jay/dist")));
const Port =  process.env.port;



mongoose.connect(process.env.MONGO_URL).then(()=>{
  app.listen(Port, () => {
  console.log(`app is listening on port :${Port}`);
}); 
}).catch((err)=>{
    console.error(`an error occured when trying to connect ${err.message}`);
})





