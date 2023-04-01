const OrderModule= require('../models/orderModel')
const getOrders= async (req,res)=>{
    
    try{
const orders=await OrderModule.find()
res.json(orders)
    }
    catch(e){
res.status(500).json(e.message)
    }
}
module.exports={getOrders}