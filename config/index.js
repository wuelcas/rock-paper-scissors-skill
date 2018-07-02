'use strict';

const path = require('path');
const env = require('./env').toLowerCase();

const configFile = require(path.join(__dirname, `${env}.json`));
configFile.env = env;

/*******  plugins  *******/


/*****  plugins end *****/



module.exports = configFile;
module.exports.asFunction = () => configFile;