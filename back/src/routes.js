const express = require('express');
const ongController = require('./Controllers/ongController');
const incidentsController = require('./Controllers/incidentController');
const profileController = require('./Controllers/profileController');
const sessionController = require('./Controllers/sessionController');

const routes = express.Router();

routes.post('/session', sessionController.create);

routes.get('/ongs', ongController.index);
routes.post('/ongs', ongController.create);

routes.get('/incidents', incidentsController.index);
routes.post('/incidents', incidentsController.create);
routes.delete('/incidents/:id', incidentsController.delete);

routes.get('/search', profileController.index);

module.exports = routes; 