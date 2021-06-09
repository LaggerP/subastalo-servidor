const metodosDePagoService = require('../services/metodosDePagoService')


/**
 * @description obtiene todos los métodos de pago asociado a un usuario.
 * @param req - id del usuario.
 * @param res - retorna todos los medios de pago.
 */
exports.getMediosDePago = async (req, res) => {
  let mediosDePago = []
  try {
    const tarjetas = await metodosDePagoService.getTarjetas(req.params.id);
    const cuentasBancarias = await metodosDePagoService.getCuentasBancarias(req.params.id);
    if (tarjetas || cuentasBancarias) {
      mediosDePago.push({tarjetas, cuentasBancarias});
      return res.status(200).send(mediosDePago);
    }
    return res.status(204).send('No hay medios de pago');
  } catch (e) {
    return res.status(500).send("Error en el servidor");
  }
}

/**
 * @description crea una nueva tarjeta de crédito/debito.
 * @param req - información de la tarjeta.
 * @param res - retorna mensaje de registro correcto.
 */
exports.createNewTarjeta = async (req, res) => {
  const tarjeta = req.body;
  tarjeta.lastNumbers = tarjeta.numero.slice(tarjeta.numero.length - 4);
  try {
    await metodosDePagoService.createTarjeta(tarjeta);
    return res.status(201).json({status:201, msg: "Tarjeta de crédito/débito cargada con éxito"});
  } catch (e) {
    return res.status(500).send("Error interno del servidor");
  }
}

/**
 * @description crea una nueva cuenta bancaria.
 * @param req - información de la cuenta bancaria.
 * @param res - retorna mensaje de registro correcto.
 */
exports.createCuentaBancaria = async (req, res) => {
  try {
    await metodosDePagoService.createCuentaBancaria(req.body);
    return res.status(201).json({status:201, msg: "Cuenta bancaria creada con éxito"});
  } catch (e) {
    return res.status(500).send("Error interno del servidor");
  }
}