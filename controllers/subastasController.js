const subastasService = require('../services/subastasService');

exports.getAllSubastas = (req, res) => {
  subastasService.getAllSubastas((error, result) => {
    if (error) return res.status(500).send('Error interno del servidor')
    else return res.status(200).json({subastas: result.recordset})
  })
}

exports.getCatalogoBySubastaId = (req, res) => {
  subastasService.getCatalogo(req.params.subastaId, (error, result) => {
    if (error) return res.status(500).send('Error interno del servidor')
    else return res.status(200).json({catalogo: result.recordset})
  })
}