const subastasService = require('../services/subastasService');
const pujasService = require('../services/pujasService');


/**
 * @description trae todas las subastas.
 * @param req.
 * @param res.
 */
exports.getAllSubastas = async (req, res) => {
  try {
    const subastas = await subastasService.getAllSubastas();
    // Subastas encontradas
    if (subastas.length > 0) return res.status(200).json({subastas});
    return res.status(204).send('No hay contenido');
  } catch (e) {
    res.status(500).send('Error interno del servidor');
  }
}

/**
 * @description trae todas las subastas en las que participo un cliente.
 * @param req.
 * @param res.
 */
exports.getAllSubastasByIdCliente = async (req, res) => {
  try {
    const subastas = await subastasService.getAllSubastasByIdCliente(req.params.id);
    // Subastas encontradas
    if (subastas.length > 0) return res.status(200).json({subastas});
    return res.status(204).send('No hay contenido');
  } catch (e) {
    res.status(500).send('Error interno del servidor');
  }
}

/**
 * @description trae el catalogo de una subasta a través del id de la subasta.
 * @param req - contiene el parámetro id de la subasta.
 * @param res - retorna el catalogo.
 */
exports.getCatalogoBySubastaId = async (req, res) => {
  try {
    let catalogo = await subastasService.getCatalogo(req.params.id);
    // Catalogo encontrado
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
    } else return res.status(204).send('No hay contenido asociado a esta subasta');
  } catch (e) {
    return res.status(500).send('Error interno del servidor');
  }
}

/**
 * @description trae el catalogo de una subasta a través del id de la subasta y el id del cliente.
 * @param req - contiene el parámetro id de la subasta.
 * @param res - retorna el catalogo.
 */
exports.getCatalogoBySubastaIdAndIdCliente = async (req, res) => {
  try {
    let catalogo = await subastasService.getCatalogoBySubastaIdAndIdCliente(req.params.idSubasta, req.params.idCliente);
    // Catalogo encontrado
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
    } else return res.status(204).send('No hay contenido asociado a esta subasta');
  } catch (e) {
    return res.status(500).send('Error interno del servidor');
  }
}

/**
 * @description trae el item que esta subastándose a través del id de la subasta.
 * @param req - contiene el parámetro id de la subasta.
 * @param res - retorna el item.
 */
exports.getItemSubastandoseBySubastaId = async (req, res) => {
  try {
    const itemSubastandose = await subastasService.getItemSubastandose(req.params.id);
    // Item encontrado
    if (itemSubastandose.length > 0) {
      try {
        itemSubastandose[0].fotos = await subastasService.getImagesByProductoId(itemSubastandose[0].idProducto);
        itemSubastandose[0].pujas = await pujasService.getPujasByItemCatalogoId(itemSubastandose[0].idItemCatalogo);
        return res.status(200).send(itemSubastandose[0]);
      } catch (e) {
        return res.status(500).send('Error interno del servidor');
      }
    } else return res.status(204).send('No hay item asociado a la subasta');
  } catch (e) {
    return res.status(500).send('Error interno del servidor');
  }
}


/**
 * @description cambia el estado 'disponible' de un producto que esta en subasta
 * @param req - contiene el id del item catalogo y del producto.
 * @param res - retorna el correcto cambio de estado
 */
exports.changeEstadoItemSubastandose = async (req, res) => {
  const {idItemCatalogo, idProducto, idPujo} = req.body
  try {
    await subastasService.changeEstadoProducto(idProducto);
    await subastasService.changeEstadoItemCatalogo(idItemCatalogo);
    await subastasService.changeEstadoPujoGanador(idPujo);
    res.status(201).send('Estados cambiados');
  } catch (e) {
    return res.status(500).send('Error interno del servidor');
  }
}
