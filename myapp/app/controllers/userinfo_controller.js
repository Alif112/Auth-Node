var Products=require('../models/products');

exports.info = function(req, res, next){
  res.render('info');
};



exports.getdata = function(req, res, next){
  var user_id=req.user._id;
  console.log('--------'+user_id);
  Products.find({user_id:user_id},function(err,products){
    if(err) throw err;
    res.send({'products':products});
  });

};



exports.createdata = function(req, res, next){
  var productname=req.body.name;
  var product=new Products({
    name:productname,
    user_id:req.user._id
  });

  product.save(function(err,products){
    if(err) throw err;
  });
  res.send({resp:'Successfully uploaded'});
};



exports.updatedata = function(req, res, next){
 var productname=req.body.newName;
 console.log(productname);
  var query = {
  '_id': req.params.id
};

Products.findOneAndUpdate(query, {
  $set: {
    name: productname,
    user_id:req.user._id
  }
}, {
  new: true,
  upsert: true
}, function(err, doc) {
  if (err) throw err;
});

  res.send({resp:'Successfully updated'});
};



exports.deletedata = function(req, res, next){
  Products.remove({_id:req.params.id},function(err){
    if(err) throw err;
  });

  res.send({resp:'Successfully deleted'});
};
