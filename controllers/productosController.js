const productosService = require('../services/productosService');

exports.createNewProducto = async (req, res) => {
  const producto = req.body;
  try {
    await productosService.createProducto(producto);
    return res.status(201).json({status:201, msg: "Nuevo producto cargado con éxito"});
  } catch (e) {
    return res.status(500).send("Error interno del servidor");
  }
}
