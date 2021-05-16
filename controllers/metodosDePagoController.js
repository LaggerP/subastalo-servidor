const metodosDePagoService = require('../services/metodosDePagoService')

exports.getMediosDePago = (req, res) => {
  const mediosDePago = []
  metodosDePagoService.getTarjetas(req.params.clienteId, (error, result) => {
    if (error) return res.status(500).send("Error en el servidor");
    else if (result.recordset) {
      mediosDePago.push({tarjetas: result.recordset});
      metodosDePagoService.getCuentasBancarias(req.params.clienteId, (error, result) => {
        if (error) return res.status(500).send("Error en el servidor");
        else if (result.recordset) mediosDePago.push({cuentasBancarias: result.recordset});
        return res.status(200).json(mediosDePago)
      })
    }
  })
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