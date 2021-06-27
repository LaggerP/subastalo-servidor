const productosRoutes = require('express').Router();
const productosController = require('../controllers/productosController');

productosRoutes.post('/new', productosController.createNewProducto);
productosRoutes.get('/cliente/:id', productosController.getAllProductsByIdClient);
productosRoutes.get('/producto/:id', productosController.getImagesByProductoId);

module.exports = productosRoutes;
