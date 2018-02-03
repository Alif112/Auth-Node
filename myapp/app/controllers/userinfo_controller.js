var Products=require('../models/products');

exports.info = function(req, res, next){
  res.render('info');
};

exports.getdata = function(req, res, next){
  Products.find({},function(err,products){
    if(err) throw err;
    res.send({'products':products});
  });

};

exports.createdata = function(req, res, next){
  var productname=req.body.name;
  var product=new Products({
    name:productname
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
    name: productname
  }
}, {
  new: true,
  upsert: true
}, function(err, doc) {
  if (err) throw err;
});

  res.send({resp:'Successfully updated'});
};
