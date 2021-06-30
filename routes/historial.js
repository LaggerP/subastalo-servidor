const historialRoutes = require('express').Router();

const historialController = require('../controllers/historialController');

historialRoutes.get('/:id', historialController.getPujasByIdCliente);

module.exports = historialRoutes;