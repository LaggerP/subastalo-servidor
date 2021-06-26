const productos = require('express').Router();
const productosController = require('../controllers/productosController');

productos.post('/new', productosController.createNewProducto);
module.exports = productos;
