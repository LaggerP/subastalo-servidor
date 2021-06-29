const productosService = require('../services/productosService');
const subastasService = require('../services/subastasService');

exports.createNewProducto = async (req, res) => {
  let {disponible, descripcionCatalogo, descripcionCompleta, revisor, duenio, estado, categoria, fotos} = req.body;
  try {
    const producto = await productosService.createProducto(disponible, descripcionCatalogo, descripcionCompleta, revisor, duenio);
    console.log("Producto Creado", producto);
    const idProducto = producto[0].idProducto;
    console.log("idProducto: ", idProducto);
    await productosService.registerEstadoProducto({idProducto, estado});
    await productosService.registerCategoriaProducto({idProducto, categoria});
    await productosService.registerFotosProducto({idProducto, imageUrl: fotos});
    return res.status(201).json({ status: 201, msg: "Nuevo producto cargado con éxito" });
  } catch (e) {
    return res.status(500).send("Error interno del servidor");
  }
}


/**
 * @description trae todas los productos por cliente
 * @param req
 * @param res
 */
exports.getAllProductsByIdClient = async (req, res) => {
  try {
    let productos = await productosService.getAllProductsByIdClient(req.params.id);
    if (productos.length > 0) {
      const newProducto = await Promise.all(productos.map(async p => {
        try {
          p.fotos = await subastasService.getImagesByProductoId(p.idProducto);
          return p;
        } catch (e) {
          res.status(500).send('Error interno del servidor');
        }
      }))
      res.status(200).send(newProducto);
    } else return res.status(204).send('No hay productos');
  } catch (e) {
    return res.status(500).send('Error interno del servidor');
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
    if (fotos.length > 0) return res.status(200).json({ fotos });
    return res.status(204).send('No hay contenido');
  } catch (e) {
    res.status(500).send('Error interno del servidor');
  }
}
