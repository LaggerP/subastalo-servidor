const subastasService = require('../services/subastasService');

exports.getAllSubastas = (req, res) => {
  subastasService.getAllSubastas((error, result) => {
    if (error) res.status(500).send('Error interno del servidor')
    else res.status(200).json({subastas: result.recordset})
  })
}

exports.getCatalogoBySubastaId = (req, res) => {
  subastasService.getCatalogo(req.params.subastaId, (error, result) => {
    if (error) res.status(500).send('Error interno del servidor')
    else res.status(200).json({catalogo: result.recordset})
  })
}