var convict = require('convict')
var conf = null;

    conf = convict({
        // log level
        loglevel: {
            doc: "The level used for logging in the application",
            format: ["error", "warn", "info", "debug"],
            default: "debug",
            env: "LOG_LEVEL"
        },
        version: {
            number: '1.0',
            date: '29/03/2016'
        }
    })

conf.validate();
module.exports=conf;
