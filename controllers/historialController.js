const historialService = require('../services/historialService');

/**
 * @description trae todas las subastas en las que participo un cliente.
 * @param req.
 * @param res.
 */
 exports.getPujasByIdCliente = async (req, res) => {
    try {
      const pujas = await historialService.getPujasByIdCliente(req.params.id);
      // Subastas encontradas
      if (pujas.length > 0) return res.status(200).json({pujas});
      return res.status(204).send('No hay contenido');
    } catch (e) {
      res.status(500).send('Error interno del servidor');
    }
  }