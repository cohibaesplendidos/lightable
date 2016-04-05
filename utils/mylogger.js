var logger = exports;
var util = require('util');
var moment = require('moment');
var conf = require('../config/config')
var levels = ['debug', 'info', 'warn', 'error'];
logger.debugLevel = conf.get("loglevel");

logger.debug = function() {
    if (levels.indexOf('debug') >= levels.indexOf(logger.debugLevel) ) {
        console.log("[" + moment(new Date()).format("YYYY/MM/DD HH:mm:ss") + "] " + util.format.apply(util,arguments));
    }
}

logger.info = function() {
    if (levels.indexOf('info') >= levels.indexOf(logger.debugLevel) ) {
        console.log("[" + moment(new Date()).format("YYYY/MM/DD HH:mm:ss") + "] " + util.format.apply(util,arguments));
    }
}

logger.warn = function() {
    if (levels.indexOf('warn') >= levels.indexOf(logger.debugLevel) ) {
        console.log("[" + moment(new Date()).format("YYYY/MM/DD HH:mm:ss") + "] " + util.format.apply(util,arguments));
    }
}

logger.error = function() {
    if (levels.indexOf('error') >= levels.indexOf(logger.debugLevel) ) {
        console.log("[" + moment(new Date()).format("YYYY/MM/DD HH:mm:ss") + "] " + util.format.apply(util,arguments));
    }
}