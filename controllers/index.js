var httpServer = require('./utils/http');
var serviceConfigFile = require('./../configs/services.json');
var log4js = require('./utils/logger');
const logger = log4js.getLogger('controllers');

httpServer.init(serviceConfigFile);