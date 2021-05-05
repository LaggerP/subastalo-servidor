const subastasRoutes = require('express').Router();
const subastasController = require('../controllers/subastasController');

subastasRoutes.get('/', subastasController.getAllSubastas);
subastasRoutes.get('/:subastaId', subastasController.getCatalogoBySubastaId);

module.exports = subastasRoutes;
