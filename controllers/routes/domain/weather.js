var express = require('express');
var router = express.Router();
var log4js = require('../../utils/logger');
const logger = log4js.getLogger('httpServices');
const request = require('request');

/**
 * Welcome on /api/v1/weather/welcome
 */
router.get('/welcome', function (req, res) {
    logger.info("Required Welcome Weather");
    var result = {
        message : "Welcome on Weather"
    }
    res.send(result);
});

router.get('/city/:city', function (req, res) {
    request('https://api.weatherbit.io/v2.0/forecast/daily?city=' + req.params.city + '&country=IT&key=ec9e5bb14178494dad84e386561bbff7&lang=it', { json: true }, (err, resR, body) => {
        if (err) {
            logger.error("Error While Required Weather for", req.params.city, err);
            res.status(500).send(err);
        }
            logger.info("Required Weather for", req.params.city, body);
            res.send(body);
        });
});

router.get('/coord', function (req, res) {
    request('https://api.weatherbit.io/v2.0/forecast/daily?lat=' + req.params.lat + ' &lon=' + req.params.lon + '&country=IT&key=ec9e5bb14178494dad84e386561bbff7&lang=it', { json: true }, (err, resR, body) => {
        if (err) {
            logger.error("Error While Required Weather with lat lon ", req.params.lat, req.params.lon, err);
            res.status(500).send(err);
        }
            logger.info("Required Weather with lat lon", req.params.lat, req.params.lon, body);
            res.send(body);
        });
});

module.exports = router;