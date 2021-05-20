const metodosDePagoService = require('../services/metodosDePagoService')

exports.getMediosDePago = async (req, res) => {
  let mediosDePago = []
  try {
    const tarjetas = await metodosDePagoService.getTarjetas(req.params.id);
    const cuentasBancarias = await metodosDePagoService.getCuentasBancarias(req.params.id);
    mediosDePago.push({tarjetas, cuentasBancarias});
    return res.status(200).send(mediosDePago);
  } catch (e) {
    return res.status(500).send("Error en el servidor");
  }

}

exports.createNewTarjeta = (req, res) => {
  const tarjeta = req.body;
  tarjeta.lastNumbers = tarjeta.numero.slice(tarjeta.numero.length - 4);
  metodosDePagoService.createTarjeta(tarjeta, (error, result) => {
    if (error) return res.status(500).send("Error interno del servidor");
    else if (result.rowsAffected) return res.status(201).send("Tarjeta de crédito/débito cargada con éxito");
  })
}

exports.createCuentaBancaria = (req, res) => {
  metodosDePagoService.createCuentaBancaria(req.body, (error, result) => {
    if (error) return res.status(500).send("Error interno del servidor");
    else if (result.rowsAffected) return res.status(201).send("Cuenta bancaria creada con éxito");
  })
}