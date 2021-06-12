const subastasRoutes = require('express').Router();
const subastasController = require('../controllers/subastasController');

subastasRoutes.get('/', subastasController.getAllSubastas);
subastasRoutes.get('/cliente/:id', subastasController.getAllSubastasByIdCliente);
subastasRoutes.get('/catalogo/:id', subastasController.getCatalogoBySubastaId);
subastasRoutes.get('/catalogo/:id/item-catalogo', subastasController.getItemSubastandoseBySubastaId);
subastasRoutes.get('/:idSubasta/cliente/:idCliente/catalogo', subastasController.getCatalogoBySubastaIdAndIdCliente);
subastasRoutes.post('/catalogo/change-item-estado', subastasController.changeEstadoItemSubastandose);

module.exports = subastasRoutes;
