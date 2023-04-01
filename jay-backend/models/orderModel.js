const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const ItemSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }
});

const OrderSchema = new Schema({
  items: { type: [ItemSchema], required: true },
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'received', 'completed'],
    default: 'pending'
  },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

const OrderModule = mongoose.model('Order', OrderSchema);
module.exports = OrderModule;
