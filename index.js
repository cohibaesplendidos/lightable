var express    = require('express');        // call express
var bodyParser = require('body-parser');
var path = require('path');
var http = require('http');
var applicationController = require('./server/servercore');
var moment = require('moment');
var rootPath = path.normalize(__dirname);
var logger = require('./utils/mylogger');
var conf = require('./config/config')
var ledcontrol = require('./server/ledcontrol');

var app = express();                 // define our app using express
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', express.static(__dirname + '/client'));
global.baseDir = __dirname;

app.use(function(req, res, next){
    // adds header to allow cross domain javascript on request
    res.set({'Access-Control-Allow-Origin': '*'})
    next()
});

app.port = 8090;

// shutdown the table
app.get('/shutdown',applicationController.shutdown);

// test a crash of node
app.get('/crashTest', function() {
    process.nextTick(function () {
        throw new Error;
    });
});

// reset leds
app.get('/reset', function(req, res) {
    ledcontrol.reset();
    res.status(200).json({msg: 'reset done'});
});

// set brigthness
app.get('/brightness', function(req, res) {
    var brightness=0;
    brightness = parseInt(req.query.b);
    ledcontrol.setBrightness(brightness);
    res.status(200).json({msg: 'brightness done'});
});

app.get('/init', function(req, res) {
    ledcontrol.init(100);
    res.status(200).json({msg: 'init done'});
});

// test color
app.get('/color', function(req, res) {
    var color = 0;
    color = parseInt('0x'+req.query.c);
    ledcontrol.setMatrixOneColor(color);
    res.status(200).json({msg: 'color done'});

    //setTimeout(function() {
    //    for(var i = 0; i < 100; i++) {
    //        pixelData[i] = 0;
    //    }
    //    ws281x.render(pixelData);
    //    res.status(200).json({msg: 'done'});
    //},3000);
});

// set one pixel
app.get('/setonepixel', function(req, res) {
    ledcontrol.setPixel(req.query.x,req.query.y,req.query.r,req.query.g,req.query.b);
    res.status(200).json({msg: 'pixel done'});
});

app.get('/version',function(req, res) {
    res.status(200).json({version: conf.get("version.number"), date: conf.get("version.date")});
});

app.get('/wave', function(req, res) {
    ledcontrol.wave(function() {
        logger.debug('returned from wave !');
    });
    res.status(200).json({msg: 'wave ongoing'});
});


app.get('/stop',function(req, res) {
    ledcontrol.stop();
    res.status(200).json({msg: 'stopped !'});
});

//app.listen(app.port,app.ipaddress, function()
app.listen(app.port,function()
{
    console.log("[" + moment(new Date()).format("YYYY/MM/DD HH:mm:ss") + "] Node server Started on port "+app.port);
})


app.use(function(err, req, res, next){
    if(err.errorIdentifier && err.httpStatus){
        // error page
        res.status(err.httpStatus).json({
            status: err.errorIdentifier,
            message: err.message
        })
    }else {
        logger.error(err.stack)
        // error page
        res.status(500).json({
            status: '500',
            message: 'the server encountered an error: '+err.toString()
        })
    }
})

app.use(function(req, res, next){
    // for any other wrong paths, return a 404 error
    res.status(404).sendFile(rootPath+"/client/404.html");
});
