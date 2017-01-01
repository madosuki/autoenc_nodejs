/// <reference path="../../DefinitelyTyped/node/node.d.ts" />
var FfmpegCommand = require('fluent-ffmpeg'), fs = require('fs'), util = require('util');
exports.post = function (req, res, next) {
    if (req.body) {
        var tmpfile = req.body.encpath;
        var inputfilename = tmpfile;
        var origfilename = tmpfile.substr(7);
        var uploadedname = tmpfile.substr(8);
        var encdir = 'public/movies' + origfilename + '_output.mp4';
        var videostream = encdir.substr(7);
        var encoded = '<video src="' + videostream + '" controls></video>';
        var wout = fs.createWriteStream(encdir);
        var keyints = 240;
        var logpass = 'log' + origfilename;
        var deletestart = '/delete';
        var encodeform = '/encode';
        var encodep = '<input type="radio" name="niconico" value="economy">ニコニコエコノミー回避';
        var submitencode = '<input type="submit" name="startencode" value="エンコードする">';
        var encodepath = '<input type="hidden" name="encpath" value="' + inputfilename + '">';
        var uploadsname = uploadedname + 'がアップロードされています。';
        var deleteorig = '<input type="submit" name="delete" value="リセットします">';
        var deletepath = '<input type="hidden" name="origdelete" value="' + inputfilename + '">';
        var deleteencpath = '<input type="hidden" name="deleteenc" value="' + encdir + '">';
        //ffmpegエンコード
        if (req.body.economy) {
            var commands = new FfmpegCommand({ source: inputfilename })
                .addOptions(["-pass", "1"])
                .addOptions(["-passlogfile", logpass])
                .addOptions(["-c:v", "libx264"])
                .size("640x?")
                .addOptions(["-g", keyints])
                .addOptions(["-an"])
                .addOptions(["-b:v", "412k"])
                .addOptions(["-fs", "40M"])
                .addOptions(["-f", "mp4"])
                .addOptions(["-movflags", "frag_keyframe+empty_moov"])
                .on("end", function () {
                console.log("Start 2pass");
                new FfmpegCommand({ source: inputfilename })
                    .addOptions(["-pass", "2"])
                    .addOptions(["-passlogfile", logpass])
                    .addOptions(["-c:v", "libx264"])
                    .addOptions(["-c:a", "libfdk_aac"])
                    .size("640x?")
                    .addOptions(["-b:v", "412k"])
                    .addOptions(["-b:a", "32k"])
                    .addOptions(["-profile:a", "aac_he_v2"])
                    .addOptions(["-ac", "2"])
                    .addOptions(["-g", keyints])
                    .addOptions(["-fs", "40M"])
                    .addOptions(["-f", "mp4"])
                    .addOptions(["-movflags", "frag_keyframe+empty_moov"])
                    .saveToFile(encdir)
                    .on('end', function () {
                    console.log("Done");
                    //index.htmlの書き換え
                    res.render('index', {
                        encodestart: encodeform,
                        encodeptag: encodep,
                        submitenc: submitencode,
                        uploadedname: uploadsname,
                        encpath: encodepath,
                        video: encoded,
                        deleteaction: deletestart,
                        origdel: deleteorig,
                        origdelpath: deletepath,
                        encdelpath: deleteencpath });
                });
            })
                .output(wout, { end: true })
                .on('start', function (commandLine) {
                console.log('Start Encode:' + commandLine);
            })
                .on('error', function (err) {
                console.log('Error:' + err.message);
            })
                .run();
        }
        if (req.body.normal) {
            var commands = new FfmpegCommand({ source: inputfilename })
                .addOptions(["-pass", "1"])
                .addOptions(["-passlogfile", logpass])
                .addOptions(["-c:v", "libx264"])
                .size("640x?")
                .addOptions(["-g", keyints])
                .addOptions(["-an"])
                .addOptions(["-b:v", "512k"])
                .addOptions(["-fs", "40M"])
                .addOptions(["-f", "mp4"])
                .addOptions(["-movflags", "frag_keyframe+empty_moov"])
                .on("end", function () {
                console.log("Start 2pass");
                new FfmpegCommand({ source: inputfilename })
                    .addOptions(["-pass", "2"])
                    .addOptions(["-passlogfile", logpass])
                    .addOptions(["-c:v", "libx264"])
                    .addOptions(["-c:a", "libfdk_aac"])
                    .size("640x?")
                    .addOptions(["-b:v", "512k"])
                    .addOptions(["-b:a", "64k"])
                    .addOptions(["-profile:a", "aac_he_v2"])
                    .addOptions(["-ac", "2"])
                    .addOptions(["-g", keyints])
                    .addOptions(["-fs", "40M"])
                    .addOptions(["-f", "mp4"])
                    .addOptions(["-movflags", "frag_keyframe+empty_moov"])
                    .saveToFile(encdir)
                    .on('end', function () {
                    console.log("Done");
                    //index.htmlの書き換え
                    res.render('index', {
                        encodestart: encodeform,
                        encodeptag: encodep,
                        submitenc: submitencode,
                        uploadedname: uploadsname,
                        encpath: encodepath,
                        video: encoded,
                        deleteaction: deletestart,
                        origdel: deleteorig,
                        origdelpath: deletepath,
                        encdelpath: deleteencpath });
                });
            })
                .output(wout, { end: true })
                .on('start', function (commandLine) {
                console.log('Start Encode:' + commandLine);
            })
                .on('error', function (err) {
                console.log('Error:' + err.message);
            })
                .run();
        }
        if (req.body.premiere) {
            var commands = new FfmpegCommand({ source: inputfilename })
                .addOptions(["-c:v", "libx264"])
                .addOptions(["-c:a", "libfdk_aac"])
                .addOptions(["-profile:a", "aac_low"])
                .addOptions(["-crf", "23"])
                .addOptions(["-b:a", "128k"])
                .addOptions(["-ac", "2"])
                .addOptions(["-g", keyints])
                .addOptions(["-fs", "99M"])
                .addOptions(["-f", "mp4"])
                .addOptions(["-movflags", "frag_keyframe+empty_moov"])
                .save(encdir)
                .on('end', function () {
                console.log("Done");
                //index.htmlの書き換え
                res.render('index', {
                    encodestart: encodeform,
                    encodeptag: encodep,
                    submitenc: submitencode,
                    uploadedname: uploadsname,
                    encpath: encodepath,
                    video: encoded,
                    deleteaction: deletestart,
                    origdel: deleteorig,
                    origdelpath: deletepath,
                    encdelpath: deleteencpath });
            })
                .output(wout, { end: true })
                .on('start', function (commandLine) {
                console.log('Start Encode:' + commandLine);
            })
                .on('error', function (err) {
                console.log('Error:' + err.message);
            })
                .run();
        }
    }
};
