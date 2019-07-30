const { AlexaPlatform, plugins, VoxaApp } = require("voxa");
const config = require("../config");
const Model = require("./model");
const states = require("./states");
const variables = require("./variables");
const views = require("./views.json");

const voxaApp = new VoxaApp({ Model, views, variables });
states(voxaApp);

exports.alexaSkill = new AlexaPlatform(voxaApp);

plugins.replaceIntent(voxaApp);

exports.voxaApp = voxaApp;
