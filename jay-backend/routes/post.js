const express = require("express");
const routerPost=express.Router();
const {updateCoins}=require('../controllers/updateCoins.js')
const {getCoins}=require('../controllers/getCoins')
const {postOrder}= require('../controllers/postOrder.js')
const {getOrders}=require('../controllers/getOrders.js')
const {createUser}=require("../controllers/createUser")
routerPost.post('/new/user',createUser)
routerPost.post("/create",postOrder)
routerPost.put("/coins/update",updateCoins)
routerPost.get("/coins/get",getCoins)
routerPost.get("/fetch",getOrders)
module.exports=routerPost