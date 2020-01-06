var configFileObj;
var log4js = require('../utils/logger');
const logger = log4js.getLogger('httpServices');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var routes = require('../routes/index');
var Ddos = require('ddos')
var ddos = new Ddos({ burst: 10, limit: 15 })

function init(configFile) {
    configFileObj = configFile;
    //app.use(ddos.express);

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
        if ('OPTIONS' === req.method) {
            res.sendStatus(200);
        } else {
            next();
        }
    });

    app.use(routes);

    app.listen(configFileObj.http.port, function () {
        logger.info("Http Services Logger Initiated");
        logger.info("Http Server Initiated on port: " + configFileObj.http.port);
    });
}

module.exports = {
    init: init
};