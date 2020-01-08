var express = require('express');
var router = express.Router();
var log4js = require('../../utils/logger');
const logger = log4js.getLogger('httpServices');

/**
 * Welcome on /api/v1/utils/welcome
 */
router.get('/welcome', function (req, res) {
    logger.info("Required Welcome Utils");
    var result = {
        message : "Welcome on utils"
    }
    res.send(result);
});

module.exports = router;