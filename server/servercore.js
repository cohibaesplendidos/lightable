var logger = require('../utils/mylogger');

// shutdown table
exports.shutdown = function (req, res, next) {
    logger.warn('shutdown');

    var exec = require('child_process').exec;
    var cmd='shutdown -h now'; // TODO : or 'sudo shutdown -h now' ?
    exec(cmd, function(error, stdout, stderr) {
        if (error) {
            logger.warn('Error while stopping raspberry table : '+error);
            res.status(500).json({msg: 'shutdown failed : '+error});
        } else {
            res.status(200).json({msg: 'shutdown initiated'});
        }
    })
};
