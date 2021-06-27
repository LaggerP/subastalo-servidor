const productosService = require('../services/productosService');
const subastasService = require('../services/subastasService');

exports.createNewProducto = async (req, res) => {
  const producto = req.body;
  try {
    await productosService.createProducto(producto);
    return res.status(201).json({status:201, msg: "Nuevo producto cargado con éxito"});
  } catch (e) {
    return res.status(500).send("Error interno del servidor");
  }
}


/**
 * @description trae todas los productos por cliente
 * @param req.
 * @param res.
 */
 exports.getAllProductsByIdClient = async (req, res) => {
  try {
    const productos = await productosService.getAllProductsByIdClient(req.params.id);
    if (productos.length > 0) return res.status(200).json({productos});
    return res.status(204).send('No hay productos');
  } catch (e) {
    res.status(500).send('Error interno del servidor');
  }
}

/**
 * @description trae las imagenes de un producto
 * @param req.
 * @param res.
 */
 exports.getImagesByProductoId = async (req, res) => {
  try {
    const fotos = await subastasService.getImagesByProductoId(req.params.id);
    if (fotos.length > 0) return res.status(200).json({fotos});
    return res.status(204).send('No hay contenido');
  } catch (e) {
    res.status(500).send('Error interno del servidor');
  }
}
