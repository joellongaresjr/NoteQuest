const miniApp = require('express').Router();

const apiRouter = require('./apiRoute.js');
const htmlRouter = require('./htmlRoute.js');


miniApp.use('/api', apiRouter); // matching URL
miniApp.use('/', htmlRouter);

module.exports = miniApp;
