const metodosDePagoService = require('../services/metodosDePagoService')

exports.getMediosDePago = async (req, res) => {
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