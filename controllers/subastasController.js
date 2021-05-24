const subastasService = require('../services/subastasService');
const pujasService = require('../services/pujasService');

exports.getAllSubastas = async (req, res) => {
  const subastas = await subastasService.getAllSubastas();
  if (subastas.length > 0) return res.status(200).json({subastas});
  return res.status(500).send('Error interno del servidor');
}

exports.getCatalogoBySubastaId = async (req, res) => {

  let catalogo = await subastasService.getCatalogo(req.params.id);
  if (catalogo.length > 0) {
    const newCatalogo = await Promise.all(catalogo.map(async producto => {
      try {
        producto.fotos = await subastasService.getImagesByProductoId(producto.idProducto);
        return producto;
      } catch (e) {
        res.status(500).send('Error interno del servidor');
      }
    }))
    res.status(200).send(newCatalogo);
  }
}

exports.getItemSubastandoseByCatalogoId = async (req, res) => {
  const itemSubastandose = await subastasService.getItemSubastandose(req.params.id);
  if (itemSubastandose.length > 0) {
    try {
      itemSubastandose[0].fotos = await subastasService.getImagesByProductoId(itemSubastandose[0].idProducto);
      itemSubastandose[0].pujas = await pujasService.getPujasByItemCatalogoId(itemSubastandose[0].idItemCatalogo);
      return res.status(200).send(itemSubastandose[0]);
    } catch (e) {
      return res.status(500).send('Error interno del servidor');
    }
  } else return res.status(500).send('Error interno del servidor');

}

