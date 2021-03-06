var mongoose = require('mongoose');
var Account = mongoose.model('account');
// var Account = mongoose.model('Account');

// send status code and data as json
var sendJSON = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.accountList = function(req, res){
  Account.find(function(err, accounts){
    if (err){
      console.log("there was an error of: " + err);
      sendJSON(res, 404, err);
    }
    console.log("success");
    sendJSON(res, 200, accounts);
  });
};

module.exports.accountFind = function(req, res){
  Account.findById(req.params.id, function(err, account){
    if (err){
      console.log("There was an error of: " + err);
      sendJSON(res, 404, err);
    }
    console.log("success");
    sendJSON(res, 200, account);
  });
}

module.exports.accountDelete = function(req, res){
  Account.findByIdAndRemove(req.params.id, function(err){
    if (err){
      console.log("Error deleting item: " + err);
      sendJSON(res, 400, err);
    } else {
      console.log("Deleted item");
      sendJSON(res, 200, {message: "Item removed"});
    }
  });
}

module.exports.accountUpdate = function(req, res){
  Account.findByIdAndUpdate(req.params.id, req.body, function(err, account){
    if (err){
      console.log("Error updating item: " + err);
      sendJSON(res, 400, err);
    }
    console.log("Item updated");
    sendJSON(res, 200, account);
  });
}

// module.exports.logout = function(req, res){
//   req.session.destroy();
// }
