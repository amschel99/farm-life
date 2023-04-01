const express = require("express");
const routerPost=express.Router();

const {postOrder}= require('../controllers/postOrder.js')
const {getOrders}=require('../controllers/getOrders')

routerPost.post("/create",postOrder)
routerPost.get("/fetch",getOrders)
module.exports=routerPost