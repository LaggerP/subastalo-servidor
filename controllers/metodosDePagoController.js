const metodosDePagoService = require('../services/metodosDePagoService')

exports.getMediosDePago = (req, res) => {
  const mediosDePago = []
  metodosDePagoService.getTarjetas(req.params.clienteId, (error, result) => {
    if (error) res.status(500).send("error en el servidor");
    else if (result.recordset) {
      mediosDePago.push({tarjetas: result.recordset});
      metodosDePagoService.getCuentasBancarias(req.params.clienteId, (error, result) => {
        if (error) res.status(500).send("error en el servidor");
        else if (result.recordset) mediosDePago.push({cuentasBancarias: result.recordset});
        res.status(200).json(mediosDePago)
      })
    }
  })
}

exports.createNewTarjeta = (req, res) => {
  const tarjeta = req.body;
  tarjeta.lastNumbers = tarjeta.numero.slice(tarjeta.numero.length - 4);
  metodosDePagoService.createTarjeta(tarjeta, (error, result) => {
    if (error) res.status(500).send("error interno del servidor");
    else if (result.rowsAffected) res.status(201).send("Tarjeta de credito cargada con exito");
  })
}


exports.createCuentaBancaria = (req, res) => {
  metodosDePagoService.createCuentaBancaria(req.body, (error, result) => {
    if (error) res.status(500).send("error interno del servidor");
    else if (result.rowsAffected) res.status(201).send("cuenta bancaria creada con exito");
  })

}