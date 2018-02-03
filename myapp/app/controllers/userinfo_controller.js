var Products=require('../models/products');

exports.info = function(req, res, next){
  res.render('info');
};

exports.getdata = function(req, res, next){
  Products.find({},function(err,products){
    if(err) throw err;
    console.log('------------ok in getdata-----------');
    res.send({'products':products});
  });

};

exports.createdata = function(req, res, next){
  var name=req.body.name;
  console.log('-----------'+name);
  var product=new Products({
    name:req.body.name
  });

  product.save(function(err){
    if(err) throw err;
    console.log('---successfully uploaded');
  });

};
