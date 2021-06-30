const productosRoutes = require('express').Router();
const productosController = require('../controllers/productosController');

productosRoutes.post('/new', productosController.createNewProducto);
productosRoutes.get('/cliente/:id', productosController.getAllProductsByIdClient);

module.exports = productosRoutes;
