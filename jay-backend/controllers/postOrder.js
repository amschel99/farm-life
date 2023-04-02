const OrderModule= require('../models/orderModel')
const postOrder= async (req,res)=>{
    const {user,items,price}=req.body
    console.log(req.body)
    try{
const order=await OrderModule.create({user,items,price})
res.json(order)
    }
    catch(e){
res.status(500).json(e.message)
    }
}
module.exports={postOrder}