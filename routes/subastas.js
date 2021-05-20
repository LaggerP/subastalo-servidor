const subastasRoutes = require('express').Router();
const subastasController = require('../controllers/subastasController');

subastasRoutes.get('/', subastasController.getAllSubastas);
subastasRoutes.get('/catalogo/:id', subastasController.getCatalogoBySubastaId);
subastasRoutes.get('/catalogo/:id/item-catalogo', subastasController.getItemSubastandoseByCatalogoId);

module.exports = subastasRoutes;
