var mongoose = require('mongoose');


var productSchema = mongoose.Schema({
  name:String,
  user_id:String
});

module.exports = mongoose.model('products', productSchema);
