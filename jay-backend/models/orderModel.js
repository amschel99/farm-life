const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const ItemSchema = new Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  quantity: { type: String },
  image: { type: String }
});

const OrderSchema = new Schema({
  items: {
    type: [{
      name: { type: String, required: true },
      price: { type: String, required: true },
      quantity: { type: String },
      image: { type: String }
    }]
  },
  user: {
    type: String,
    required: [true, "required"]
  },
  price: {
    type: String,
    required: [true, 'required']
  },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

const OrderModule = mongoose.model('Order', OrderSchema);
module.exports = OrderModule;
