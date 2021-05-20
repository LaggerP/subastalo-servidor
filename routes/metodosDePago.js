const metodosDePago = require('express').Router();
const metodosDePagoController = require('../controllers/metodosDePagoController');

metodosDePago.get('/user/:id', metodosDePagoController.getMediosDePago);
metodosDePago.post('/new/tarjeta', metodosDePagoController.createNewTarjeta);
metodosDePago.post('/new/cuenta-bancaria', metodosDePagoController.createCuentaBancaria);
module.exports = metodosDePago;
