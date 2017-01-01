/// <reference path="../../DefinitelyTyped/node/node.d.ts" />
var fs = require('fs');
exports.post = function (req, res, next) {
    if (req.file) {
        //console.log(req.body);
        console.log(req.file);
        var videopath = req.file.path;
        var videoname = req.file.filename;
        var encodeform = '/encode';
        var encodep_eco = '<input type="radio" name="economy" value="niconico">ニコニコエコノミー回避';
        var encodep_nor = '<input type="radio" name="normal" value="niconico">ニコニコ一般会員向け';
        var encodep_pre = '<input type="radio" name="premiere" value="niconico">ニコニコプレミアム会員向け';
        var submitencode = '<input type="submit" name="startencode" value="エンコードする">';
        var encodepath = '<input type="hidden" name="encpath" value="' + videopath + '">';
        var uploads_name = req.file.filename + 'がアップロードされています。';
        res.render('index', {
            encodestart: encodeform,
            encodeptag_eco: encodep_eco,
            encodeptag_nor: encodep_nor,
            encodeptag_pre: encodep_pre,
            submitenc: submitencode,
            uploadedname: uploads_name,
            encpath: encodepath });
    }
};
