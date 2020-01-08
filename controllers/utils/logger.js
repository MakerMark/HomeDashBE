const log4js = require('log4js');

log4js.configure({
	appenders: {
        "console": { type: 'console' },
        "httpServicesLog": { 
            type: 'file', 
            filename: './logs/restServices.log'
        },
        "controllerLog": { 
            type: 'file', 
            filename: './logs/controller.log'
        },
        "mainLog": { 
            type: 'file', 
            filename: './logs/main.log'
        }
	},
    categories: {
        "default": {
            level: "debug", 
            appenders: [ "console", "mainLog" ] 
        },
        "httpServices": { 
            level: "info", 
            appenders: [ "console", "httpServicesLog", "mainLog" ] 
        },
        "controllers": { 
            level: "info", 
            appenders: [ "console","controllerLog", "mainLog" ] 
        }
    }
});

module.exports = log4js;