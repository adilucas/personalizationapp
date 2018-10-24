const { Router } = require('express');
const userIdsController = require('./userids.controller');

const api = Router();

api.use('/userid', userIdsController);

module.exports = api;