const metodosDePago = require('express').Router();
const metodosDePagoController = require('../controllers/metodosDePagoController');

metodosDePago.get('/user/:clienteId', metodosDePagoController.getMediosDePago);

module.exports = metodosDePago;
