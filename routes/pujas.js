const pujasRoutes = require('express').Router();
const pujasController = require('../controllers/pujasController');

pujasRoutes.get('/catalogo/:id/', pujasController.getPujasByCatalogoId);
pujasRoutes.post('/new-puja', pujasController.newPuja);

module.exports = pujasRoutes;
