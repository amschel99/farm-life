const express = require("express");
const router=express.Router();
const {CreateToken, callBack,stkPush,sendTransactionDetails}= require('../controllers/Token.js')
const {postOrder}= require('../controllers/postOrder.js')
router.post("/",CreateToken,stkPush)

router.post('/callback',callBack)
router.get("/details",callBack,sendTransactionDetails)
router.post("/postOrder",postOrder)
module.exports=router