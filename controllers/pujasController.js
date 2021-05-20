const pujasService = require('../services/pujasService');

exports.getPujasByCatalogoId = async (req, res) => {
  try {
    const pujas = await pujasService.getPujasByItemCatalogoId(req.params.id);
    return res.status(200).send(pujas)
  } catch (e) {
    return res.status(500).send("Error en el servidor");
  }
}

exports.newPuja = async (req, res) => {
  let {idSubasta, idCliente, numeroPostor, importe, idItem, asistente = 0} = req.body
  try {
    const asistenteRegistrado = await pujasService.registerAsistente({idSubasta, idCliente, numeroPostor});
    // si asistenteRegistrado es null, significa que el mismo ya se encuentra registrado en la subasta
    if (asistenteRegistrado !== null) {
      (asistente === 0 && asistenteRegistrado[0].asistente) ? asistente = asistenteRegistrado[0].asistente : asistente
      await pujasService.registerPuja({asistente, idItem, importe});
      return res.status(201).json({
        msg: "Puja realizada con éxito",
        idAsistente: asistente
      })
    }
  } catch (e) {
    return res.status(500).send("Error de servidor")
  }
}