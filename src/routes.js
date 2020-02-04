const express = require('express');
const routes = express.Router();
const LoggedController = require('./controller/loggedins');

routes.get('/data', LoggedController.index);

module.exports = routes;