var express = require('express');
var router = express.Router();
var log4js = require('../../utils/logger');
const logger = log4js.getLogger('httpServices');
const sensorList = require('./../../../dataMock/sensors');
/**
 * Welcome on /api/v1/sensors/welcome
 */
router.get('/welcome', function (req, res) {
    logger.info("Required Welcome Sensors");
    var result = {
        message : "Welcome on Sensors"
    }
    res.send(result);
});

router.get('/all', function (req, res) {
    logger.info("Required Sensors List");
    res.send(sensorList);
});

router.get('/:id', function (req, res) {
    logger.info("Required Sensor " + req.params.id);
    for(let sensor in sensorList){
        for(var i = 0; i < sensorList[sensor].length; i++){
            if(sensorList[sensor][i].id == req.params.id){
                sensorList[sensor][i].rilevazioni = [];
                if(sensor == "socket"){
                    for(var x = 0; x < Math.floor(Math.random() * 50) + 1; x++){
                        var ts = Math.round((new Date()).getTime() / 1000);
                        sensorList[sensor][i].rilevazioni.push({
                            measuredW: Math.floor(Math.random() * 100) + 0,
                            timestamp: ts,
                        })
                        sensorList[sensor][i].lastUpdate = ts;
                        sensorList[sensor][i].status = Math.random() >= 0.5;
                        if(sensorList[sensor][i].status){
                            sensorList[sensor][i].currentW = Math.floor(Math.random() * 100) + 1;
                        }else{
                            sensorList[sensor][i].currentW = 0;
                        }
                    }
                }else if(sensor == "temperature"){
                    for(var x = 0; x < Math.floor(Math.random() * 50) + 1; x++){
                        var ts = Math.round((new Date()).getTime() / 1000);
                        sensorList[sensor][i].rilevazioni.push({
                            measured: Math.floor(Math.random() * 30) + 0,
                            timestamp: ts,
                        })
                        sensorList[sensor][i].lastUpdate = ts;
                    }
                    sensorList[sensor][i].current = Math.floor(Math.random() * 30) + 1;
                }

                res.send(sensorList[sensor][i]);
                return;
            }
        }
    };
    res.status(404).send({message: "Sensor not found"});
});

module.exports = router;