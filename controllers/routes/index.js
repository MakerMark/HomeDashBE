var express = require('express');
var router = express.Router();
var log4js = require('../utils/logger');
const logger = log4js.getLogger('httpServices');
var configFile = require('./../../configs/services.json');
var path = configFile.http.baseUrl;

logger.info("Http Services Router Initiated on path: " + path);
/**
 * ROUTE NON AUTENTICATE
 */
router.get(path + 'wUnAuth', function (req, res) {
    res.json({ message: 'welcome anonymous' });
});

/**
 * ROUTE AUTENTICATE
 */
router.use(path + 'sensors', validateUser, require('./domain/sensors'));
router.use(path + 'utils', validateUser, require('./domain/utils'));

/**
 * CHIAMATA GENERALE DI BENVENUTO
 */
router.get(path + 'wAuth', validateUser, function (req, res) {
    res.json({ message: 'welcome with token' });
});

/**
 * ROUTE SCONOSCIUTE (errore 404)
 */
router.get('*', function (req, res) {
    res.status(404).json({url: req.url, message: "Not Found"});
});

router.post('*', function (req, res) {
    res.status(404).json({url: req.url, message: "Not Found"});
});

function validateUser(req, res, next) {
    if(req.headers.authorization){
        var buff = Buffer.from(req.headers.authorization.split(" ")[1], 'base64');
        var token = buff.toString('ascii');
        if(token == "user:pippo"){
            next();
        }else{
            logger.warn("Someone trying to call with wrong credential: " + req.url);
            res.status(401).json({status:"error", message: "Wrong Credentials"});
        }
    }else{
        logger.warn("Someone trying to call an authenticated route without credentials: " + req.url);
        res.status(401).json({status:"error", message: "Missing Credentials"});
    }
}

module.exports = router;