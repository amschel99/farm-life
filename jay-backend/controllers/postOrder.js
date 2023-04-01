const OrderModule= require('../models/orderModel')
const postOrder= async (req,res)=>{
    const {items,totalPrice}=req.body
    try{
const order=await OrderModule.create({items,totalPrice})
res.json(order)
    }
    catch(e){
res.status(500).json(e.message)
    }
}
module.exports={postOrder}