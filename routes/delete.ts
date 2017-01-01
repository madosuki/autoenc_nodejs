/// <reference path="../../DefinitelyTyped/node/node.d.ts" />
var fs = require('fs');

exports.post = function(req, res, next) {
  console.log(req.body);
  console.log(req.body.origdelete);
  if(req.body) {
        var up_tmpfile = req.body.origdelete;
    var enc_tmpfile = req.body.deleteenc;
    
  if(req.body.origdelete) {
    fs.unlink(up_tmpfile, function(err) {
      if(err) throw err;
      })
  }
      if(req.body.deleteenc) {
      fs.unlink(enc_tmpfile, function(err) {
        if(err) throw err;
        console.log('削除成功');
        res.render('index');
       })
      }
  }

}
