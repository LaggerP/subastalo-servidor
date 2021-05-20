const router = require('express').Router();
const usuariosRoutes = require('./usuarios');
const subastasRoutes = require('./subastas');
const metodosDePagoRoutes = require('./metodosDePago');
const pujasRoutes = require('./pujas');

router.get('/api', function (req, res) {
  res.json({msg: "funcionando"})
})

// Todos los endpoints asociados a usuarios.
router.use('/api/user/', usuariosRoutes);

// Todos los endpoints asociados a las subastas
router.use('/api/subastas/', subastasRoutes);

// Todos los endpoints asociados a las subastas
router.use('/api/metodo-de-pago/', metodosDePagoRoutes);

// Todos los endpoints asociados a las pujas
router.use('/api/pujas/', pujasRoutes);

module.exports = router;