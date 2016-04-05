var logger = require('../utils/mylogger');

var pixelData = new Uint32Array(100);
var ws281x = require('rpi-ws281x-native');
var stop=false;

exports.init = function(n) {
    ws281x.init(n); // 100 leds
}

exports.reset = function() {
    ws281x.reset();
}

exports.setBrightness = function(b) {
    ws281x.setBrightness(b);
}

exports.setPixel = function(x,y,r,g,b) {
    var x = parseInt(x);
    var y = parseInt(y);

    var first = 0;
    if (x % 2 == 0) {
        first = 5 * (x - 1) + 6 - y;
    } else {
        first = 5 * (x - 1) + y;
    }

    var color = parseInt('0x'+r+g+b);
    var index = 4*first-4;

    logger.debug('index = '+index);

    pixelData[index++] =  color;
    pixelData[index++] =  color;
    pixelData[index++] =  color;
    pixelData[index++] =  color;

    ws281x.render(pixelData);
}
exports.setMatrixOneColor = function(color) {
    for(var i = 0; i < 100; i++) {
        pixelData[i] = color;
    }
    ws281x.render(pixelData);
}

var id=null;
exports.wave = function(cb) {
    stop=false;
    var color = 0;
    var colorSt='';
    var deg_r = 173;
    var deg_g = 8;
    var deg_b = 247;
    var r = 0;
    var g = 0;
    var b = 0;
        var id = setInterval(function () {
            deg_r++;
            if (deg_r==360) deg_r=0;
            deg_g++;
            if (deg_g==360) deg_g=0;
            deg_b++;
            if (deg_b==360) deg_b=0;

            r = Math.round((Math.sin(deg_r*Math.PI/180)+1)/2*255);
            g = Math.round((Math.sin(deg_g*Math.PI/180)+1)/2*255);
            b = Math.round((Math.sin(deg_b*Math.PI/180)+1)/2*255);

            color = r*256*256+g*256+b;
            exports.setMatrixOneColor(color);
            if (stop)
                clearInterval(id);
        }, 50);
}

exports.stop = function() {
    stop=true;
}
