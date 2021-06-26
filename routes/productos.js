const productosRoutes = require('express').Router();
const productosController = require('../controllers/productosController');

productosRoutes.post('/new', productosController.createNewProducto);

module.exports = productosRoutes;
